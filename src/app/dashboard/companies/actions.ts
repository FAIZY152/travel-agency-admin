"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCompany, deleteCompany } from "@/lib/data/companies";

function buildCompaniesRedirectUrl(params: Record<string, string>) {
  const query = new URLSearchParams(params);
  return `/dashboard/companies?${query.toString()}`;
}

export async function createCompanyAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const contactInfo = String(formData.get("contactInfo") ?? "");

  const result = await createCompany({ name, contactInfo });

  if (result.ok) {
    revalidatePath("/dashboard/companies");
    revalidatePath("/dashboard");
    redirect(buildCompaniesRedirectUrl({ status: "created" }));
  }

  redirect(buildCompaniesRedirectUrl({ error: result.message }));
}

export async function deleteCompanyAction(formData: FormData) {
  const companyId = String(formData.get("companyId") ?? "");
  const result = await deleteCompany(companyId);

  if (result.ok) {
    revalidatePath("/dashboard/companies");
    revalidatePath("/dashboard");
    redirect(buildCompaniesRedirectUrl({ status: "deleted" }));
  }

  redirect(buildCompaniesRedirectUrl({ error: result.message }));
}
