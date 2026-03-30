export function formatDocumentDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(value));
}

export function getVerificationStatus(expiryDate: string) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
  }).format(new Date());

  return expiryDate < today ? "EXPIRED" : "VALID";
}

export function getRequestOrigin(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "http";
  const host =
    headers.get("x-forwarded-host") ||
    headers.get("host") ||
    "localhost:3000";

  return `${protocol}://${host}`;
}

export function buildVerificationUrl(origin: string, qrToken: string) {
  return `${origin}/verify/${encodeURIComponent(qrToken)}`;
}

export function buildQrCodeImageUrl(value: string) {
  const params = new URLSearchParams({
    text: value,
    size: "240",
    margin: "1",
    format: "png",
  });

  return `https://quickchart.io/qr?${params.toString()}`;
}
