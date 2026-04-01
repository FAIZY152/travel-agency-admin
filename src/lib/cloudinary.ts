const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

export const CUSTOMER_IMAGE_MAX_EDGE_PX = 1200;
export const CUSTOMER_IMAGE_UPLOAD_TARGET_BYTES = 180 * 1024;
export const CUSTOMER_IMAGE_SOURCE_LIMIT_BYTES = 10 * 1024 * 1024;

type DeliveryOptions = {
  width: number;
  height?: number;
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
    "c_limit",
    `w_${options.width}`,
  ];

  if (options.height) {
    transforms.push(`h_${options.height}`);
  }

  return `${uploadPrefix}${transforms.join(",")}/${uploadSuffix}`;
}
