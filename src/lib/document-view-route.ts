export const DOCUMENT_VIEW_BASE_PATH = "/health/issue/printedlicenses/uuid";

export function getCustomerDocumentHref(id: string) {
  return `${DOCUMENT_VIEW_BASE_PATH}/${id}`;
}
