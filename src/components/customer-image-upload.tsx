"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  buildCloudinaryImageUrl,
  CUSTOMER_IMAGE_MAX_EDGE_PX,
  CUSTOMER_IMAGE_SOURCE_LIMIT_BYTES,
  CUSTOMER_IMAGE_UPLOAD_TARGET_BYTES,
} from "@/lib/cloudinary";

const OUTPUT_IMAGE_TYPE = "image/jpeg";
const PREVIEW_IMAGE_WIDTH = 320;
const JPEG_QUALITY_STEPS = [0.82, 0.72, 0.62, 0.52, 0.45];

type Props = {
  inputName: string;
  initialImageUrl?: string;
  onUploadingChange?: (uploading: boolean) => void;
};

function getOutputFileName(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, "").trim() || "customer-image";
  return `${baseName}.jpg`;
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read this image file."));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not optimize this image."));
          return;
        }

        resolve(blob);
      },
      OUTPUT_IMAGE_TYPE,
      quality,
    );
  });
}

async function optimizeImageForUpload(file: File) {
  const image = await loadImage(file);
  const longestEdge = Math.max(image.naturalWidth, image.naturalHeight) || 1;
  const scale = Math.min(1, CUSTOMER_IMAGE_MAX_EDGE_PX / longestEdge);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Image optimization is not available in this browser.");
  }

  // Photos are stored as JPEG to keep uploads predictable and small.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  let optimizedBlob: Blob | null = null;

  for (const quality of JPEG_QUALITY_STEPS) {
    optimizedBlob = await canvasToBlob(canvas, quality);
    if (optimizedBlob.size <= CUSTOMER_IMAGE_UPLOAD_TARGET_BYTES) {
      break;
    }
  }

  if (!optimizedBlob) {
    throw new Error("Image optimization failed.");
  }

  return new File([optimizedBlob], getOutputFileName(file.name), {
    type: OUTPUT_IMAGE_TYPE,
    lastModified: Date.now(),
  });
}

export function CustomerImageUpload({
  inputName,
  initialImageUrl = "",
  onUploadingChange,
}: Props) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const previewImageUrl = buildCloudinaryImageUrl(imageUrl, {
    width: PREVIEW_IMAGE_WIDTH,
  });

  const setUploadingState = (val: boolean) => {
    setUploading(val);
    onUploadingChange?.(val);
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previousImageUrl = imageUrl;
    setError("");
    setUploadingState(true);

    try {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Only JPG, PNG, or WEBP files are supported.");
      }

      if (file.size > CUSTOMER_IMAGE_SOURCE_LIMIT_BYTES) {
        throw new Error("Please choose an image smaller than 10MB.");
      }

      const optimizedFile = await optimizeImageForUpload(file);
      const formData = new FormData();
      formData.append("file", optimizedFile);

      const response = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Upload failed.");

      setImageUrl(payload.imageUrl || "");
    } catch (uploadError) {
      const message =
        uploadError instanceof Error ? uploadError.message : "Could not upload image.";
      setError(message);
      setImageUrl(previousImageUrl);
    } finally {
      setUploadingState(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={inputName} value={imageUrl} />

      <label className="field-label">image</label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onFileChange}
        disabled={uploading}
        className="block w-full cursor-pointer rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-[#102844] file:mr-3 file:rounded-xl file:border-0 file:bg-brand file:px-3 file:py-2.5 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-strong disabled:opacity-60"
      />

      {uploading ? (
        <p className="text-xs font-semibold text-brand">Optimizing and uploading... wait before saving.</p>
      ) : null}

      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}

      {imageUrl ? (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 p-2">
          <Image
            src={previewImageUrl}
            alt="Customer preview"
            width={PREVIEW_IMAGE_WIDTH}
            height={PREVIEW_IMAGE_WIDTH}
            className="h-44 w-full rounded-[18px] object-cover"
          />
        </div>
      ) : (
        <p className="text-xs text-muted">Upload JPG/PNG/WEBP up to 10MB. We resize and compress it before upload.</p>
      )}
    </div>
  );
}
