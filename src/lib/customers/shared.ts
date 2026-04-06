export type CustomerListItem = {
  id: string;
  companyId: string | null;
  companyName: string;
  name: string;
  nameAr: string | null;
  passport: string;
  jobTitle: string;
  jobTitleAr: string | null;
  imageUrl: string;
  createdAt: string;
  municipal: string | null;
  honesty: string | null;
  idNumber: string | null;
  nationality: string | null;
  sex: string | null;
  occupation: string | null;
  healthCertNumber: string | null;
  healthCertExpiryHijri: string | null;
  healthCertExpiry: string | null;
  healthCertIssueHijri: string | null;
  healthCertIssueGregorian: string | null;
  eduProgramEnd: string | null;
  eduProgramType: string | null;
  facilityName: string | null;
  licenseNumber: string | null;
  facilityNumber: string | null;
};

export const CUSTOMERS_PAGE_SIZE = 8;
export const EMPTY_CUSTOMER_IMAGE_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
