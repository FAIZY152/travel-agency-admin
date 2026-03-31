"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCompany, deleteCompany } from "@/lib/data/companies";

const DEFAULT_COMPANIES_ROUTE = "/dashboard/companies";
const ALLOWED_COMPANY_PATHS = new Set([
  "/dashboard/companies",
  "/dashboard/companies/add",
  "/dashboard/companies/list",
]);

function getSafeReturnTo(formData: FormData) {
  const rawValue = String(formData.get("returnTo") ?? "").trim();

  if (!rawValue) {
    return DEFAULT_COMPANIES_ROUTE;
  }

  try {
    const parsed = new URL(rawValue, "http://localhost");
    return ALLOWED_COMPANY_PATHS.has(parsed.pathname)
      ? `${parsed.pathname}${parsed.search}`
      : DEFAULT_COMPANIES_ROUTE;
  } catch {
    return DEFAULT_COMPANIES_ROUTE;
  }
}

function buildCompaniesRedirectUrl(params: Record<string, string>, basePath = DEFAULT_COMPANIES_ROUTE) {
  const query = new URLSearchParams(params);
  const queryString = query.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export async function createCompanyAction(formData: FormData) {
  const returnTo = getSafeReturnTo(formData);
  const name = String(formData.get("name") ?? "");

  const result = await createCompany({ name });

  if (result.ok) {
    revalidatePath("/dashboard/companies");
    revalidatePath("/dashboard/companies/add");
    revalidatePath("/dashboard/companies/list");
    revalidatePath("/dashboard");
    redirect(buildCompaniesRedirectUrl({ status: "created" }, returnTo));
  }

  redirect(buildCompaniesRedirectUrl({ error: result.message }, returnTo));
}

export async function deleteCompanyAction(formData: FormData) {
  const companyId = String(formData.get("companyId") ?? "");
  const returnTo = getSafeReturnTo(formData);
  const result = await deleteCompany(companyId);

  if (result.ok) {
    revalidatePath("/dashboard/companies");
    revalidatePath("/dashboard/companies/add");
    revalidatePath("/dashboard/companies/list");
    revalidatePath("/dashboard");
    redirect(buildCompaniesRedirectUrl({ status: "deleted" }, returnTo));
  }

  redirect(buildCompaniesRedirectUrl({ error: result.message }, returnTo));
}
