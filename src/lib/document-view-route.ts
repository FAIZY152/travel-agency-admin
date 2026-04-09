export const DOCUMENT_VIEW_BASE_PATH = "/Eservices/health/issue/printedlicenses/uuid";

export function getCustomerDocumentHref(id: string) {
  return `${DOCUMENT_VIEW_BASE_PATH}/${id}`;
}
