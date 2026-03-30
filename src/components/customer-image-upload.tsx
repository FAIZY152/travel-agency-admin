"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent } from "react";

type Props = {
  inputName: string;
  initialImageUrl?: string;
  onUploadingChange?: (uploading: boolean) => void;
};

export function CustomerImageUpload({
  inputName,
  initialImageUrl = "",
  onUploadingChange,
}: Props) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
      const formData = new FormData();
      formData.append("file", file);

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
        <p className="text-xs font-semibold text-brand">Uploading... wait before saving.</p>
      ) : null}

      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}

      {imageUrl ? (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 p-2">
          <Image
            src={imageUrl}
            alt="Customer preview"
            width={800}
            height={500}
            className="h-44 w-full rounded-[18px] object-cover"
          />
        </div>
      ) : (
        <p className="text-xs text-muted">Upload JPG/PNG/WEBP up to 5MB.</p>
      )}
    </div>
  );
}
