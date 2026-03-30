import { createHash } from "node:crypto";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_JWT_ALGORITHM,
  getJwtSecret,
} from "@/lib/auth";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

async function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const tokenPair = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!tokenPair) return false;

  const token = decodeURIComponent(
    tokenPair.slice(`${AUTH_COOKIE_NAME}=`.length),
  );
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(getJwtSecret());
    await jwtVerify(token, secret, { algorithms: [AUTH_JWT_ALGORITHM] });
    return true;
  } catch {
    return false;
  }
}

function buildCloudinarySignature(
  folder: string,
  timestamp: number,
  apiSecret: string,
) {
  const payload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  return createHash("sha1").update(payload).digest("hex");
}

export async function POST(request: Request) {
  const authorized = await isAuthorized(request);
  if (!authorized) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder =
    process.env.CLOUDINARY_UPLOAD_FOLDER || "travel-agency/customers";

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: "Cloudinary credentials are not configured." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Please select an image file." },
      { status: 400 },
    );
  }

  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json(
      { message: "Only JPG, PNG, or WEBP files are supported." },
      { status: 400 },
    );
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return NextResponse.json(
      { message: "Image must be 5MB or smaller." },
      { status: 400 },
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildCloudinarySignature(folder, timestamp, apiSecret);
  const cloudinaryForm = new FormData();

  cloudinaryForm.append("file", file);
  cloudinaryForm.append("api_key", apiKey);
  cloudinaryForm.append("timestamp", String(timestamp));
  cloudinaryForm.append("folder", folder);
  cloudinaryForm.append("signature", signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cloudinaryForm },
    );

    const payload = await response.json().catch(() => ({})) as Record<string, unknown>;

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            (payload?.error as Record<string, string>)?.message ||
            "Cloudinary rejected this upload.",
        },
        { status: 400 },
      );
    }

    const secureUrl = typeof payload.secure_url === "string" ? payload.secure_url : "";
    const publicId = typeof payload.public_id === "string" ? payload.public_id : "";

    if (!secureUrl.startsWith("https://res.cloudinary.com/")) {
      return NextResponse.json(
        { message: "Unexpected response from image service." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Image uploaded successfully.",
      imageUrl: secureUrl,
      publicId,
    });
  } catch {
    return NextResponse.json(
      { message: "Image upload failed. Please try again." },
      { status: 500 },
    );
  }
}
