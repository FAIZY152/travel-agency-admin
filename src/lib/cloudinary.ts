const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

export const CUSTOMER_IMAGE_MAX_EDGE_PX = 640;
export const CUSTOMER_IMAGE_MIN_EDGE_PX = 160;
export const CUSTOMER_IMAGE_UPLOAD_MIN_BYTES = 15 * 1024;
export const CUSTOMER_IMAGE_UPLOAD_TARGET_BYTES = 28 * 1024;
export const CUSTOMER_IMAGE_UPLOAD_MAX_BYTES = 40 * 1024;
export const CUSTOMER_IMAGE_SOURCE_LIMIT_BYTES = 10 * 1024 * 1024;

type DeliveryOptions = {
  width: number;
  height?: number;
  crop?: "limit" | "fill";
  gravity?: "auto" | "center" | "face";
};

export function buildCloudinaryImageUrl(
  imageUrl: string,
  options: DeliveryOptions,
) {
  if (!imageUrl.startsWith("https://res.cloudinary.com/")) {
    return imageUrl;
  }

  const uploadIndex = imageUrl.indexOf(CLOUDINARY_UPLOAD_SEGMENT);
  if (uploadIndex === -1) {
    return imageUrl;
  }

  const uploadPrefix = imageUrl.slice(
    0,
    uploadIndex + CLOUDINARY_UPLOAD_SEGMENT.length,
  );
  const uploadSuffix = imageUrl.slice(
    uploadIndex + CLOUDINARY_UPLOAD_SEGMENT.length,
  );
  const transforms = [
    "f_auto",
    "q_auto:eco",
    options.crop === "fill" ? "c_fill" : "c_limit",
    `w_${options.width}`,
  ];

  if (options.height) {
    transforms.push(`h_${options.height}`);
  }

  if (options.crop === "fill" && options.gravity) {
    transforms.push(`g_${options.gravity}`);
  }

  return `${uploadPrefix}${transforms.join(",")}/${uploadSuffix}`;
}
