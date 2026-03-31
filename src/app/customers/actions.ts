"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCustomer, deleteCustomer, updateCustomer } from "@/lib/data/customers";

function buildCustomersRedirectUrl(params: Record<string, string>) {
  const query = new URLSearchParams(params);
  return `/customers?${query.toString()}`;
}

function parseCustomerForm(formData: FormData) {
  return {
    companyId: String(formData.get("companyId") ?? ""),
    name: String(formData.get("name") ?? ""),
    passport: String(formData.get("passport") ?? ""),
    jobTitle: String(formData.get("jobTitle") ?? ""),
    issueDate: String(formData.get("issueDate") ?? ""),
    expiryDate: String(formData.get("expiryDate") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
  };
}

export async function createCustomerAction(formData: FormData) {
  const result = await createCustomer(parseCustomerForm(formData));

  if (result.ok) {
    revalidatePath("/customers");
    revalidatePath("/dashboard");
    redirect(buildCustomersRedirectUrl({ status: "created" }));
  }
  redirect(buildCustomersRedirectUrl({ error: result.message }));
}

export async function updateCustomerAction(formData: FormData) {
  const customerId = String(formData.get("customerId") ?? "");
  const result = await updateCustomer(customerId, parseCustomerForm(formData));

  if (result.ok) {
    revalidatePath("/customers");
    revalidatePath("/dashboard");
    redirect(buildCustomersRedirectUrl({ status: "updated" }));
  }

  redirect(buildCustomersRedirectUrl({ error: result.message, edit: customerId }));
}

export async function deleteCustomerAction(formData: FormData) {
  const customerId = String(formData.get("customerId") ?? "");
  const result = await deleteCustomer(customerId);

  if (result.ok) {
    revalidatePath("/customers");
    revalidatePath("/dashboard");
    redirect(buildCustomersRedirectUrl({ status: "deleted" }));
  }

  redirect(buildCustomersRedirectUrl({ error: result.message }));
}
