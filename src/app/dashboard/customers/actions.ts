"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCustomer, deleteCustomer, updateCustomer } from "@/lib/data/customers";

const DEFAULT_CUSTOMERS_ROUTE = "/dashboard/customers";
const ALLOWED_CUSTOMER_PATHS = new Set([
  "/dashboard/customers",
  "/dashboard/customers/add",
  "/dashboard/customers/list",
]);

function getSafeReturnTo(formData: FormData) {
  const rawValue = String(formData.get("returnTo") ?? "").trim();

  if (!rawValue) {
    return DEFAULT_CUSTOMERS_ROUTE;
  }

  try {
    const parsed = new URL(rawValue, "http://localhost");
    return ALLOWED_CUSTOMER_PATHS.has(parsed.pathname)
      ? `${parsed.pathname}${parsed.search}`
      : DEFAULT_CUSTOMERS_ROUTE;
  } catch {
    return DEFAULT_CUSTOMERS_ROUTE;
  }
}

function buildCustomersRedirectUrl(params: Record<string, string>, basePath = DEFAULT_CUSTOMERS_ROUTE) {
  const query = new URLSearchParams(params);
  const queryString = query.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

function parseCustomerForm(formData: FormData) {
  return {
    companyId: String(formData.get("companyId") ?? ""),
    name: String(formData.get("name") ?? ""),
    passport: String(formData.get("passport") ?? ""),
    jobTitle: String(formData.get("jobTitle") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    municipal: String(formData.get("municipal") ?? ""),
    honesty: String(formData.get("honesty") ?? ""),
    idNumber: String(formData.get("idNumber") ?? ""),
    nationality: String(formData.get("nationality") ?? ""),
    sex: String(formData.get("sex") ?? ""),
    occupation: String(formData.get("occupation") ?? ""),
    healthCertNumber: String(formData.get("healthCertNumber") ?? ""),
    healthCertExpiryHijri: String(formData.get("healthCertExpiryHijri") ?? ""),
    healthCertExpiry: String(formData.get("healthCertExpiry") ?? ""),
    healthCertIssueHijri: String(formData.get("healthCertIssueHijri") ?? ""),
    healthCertIssueGregorian: String(formData.get("healthCertIssueGregorian") ?? ""),
    eduProgramEnd: String(formData.get("eduProgramEnd") ?? ""),
    eduProgramEndGregorian: String(formData.get("eduProgramEndGregorian") ?? ""),
    eduProgramType: String(formData.get("eduProgramType") ?? ""),
    facilityName: String(formData.get("facilityName") ?? ""),
    licenseNumber: String(formData.get("licenseNumber") ?? ""),
    facilityNumber: String(formData.get("facilityNumber") ?? ""),
  };
}

export async function createCustomerAction(formData: FormData) {
  const returnTo = getSafeReturnTo(formData);
  const result = await createCustomer(parseCustomerForm(formData));

  if (result.ok) {
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/customers/list");
    revalidatePath("/dashboard");
    redirect(buildCustomersRedirectUrl({ status: "created" }, returnTo));
  }

  redirect(buildCustomersRedirectUrl({ error: result.message }, returnTo));
}

export async function updateCustomerAction(formData: FormData) {
  const customerId = String(formData.get("customerId") ?? "");
  const returnTo = getSafeReturnTo(formData);
  const result = await updateCustomer(customerId, parseCustomerForm(formData));

  if (result.ok) {
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/customers/list");
    revalidatePath("/dashboard");
    redirect(buildCustomersRedirectUrl({ status: "updated" }, returnTo));
  }

  redirect(buildCustomersRedirectUrl({ error: result.message, edit: customerId }, returnTo));
}

export async function deleteCustomerAction(formData: FormData) {
  const customerId = String(formData.get("customerId") ?? "");
  const returnTo = getSafeReturnTo(formData);
  const result = await deleteCustomer(customerId);

  if (result.ok) {
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/customers/list");
    revalidatePath("/dashboard");
    redirect(buildCustomersRedirectUrl({ status: "deleted" }, returnTo));
  }

  redirect(buildCustomersRedirectUrl({ error: result.message }, returnTo));
}
