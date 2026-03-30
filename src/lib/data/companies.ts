import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];

const createCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters.")
    .max(120, "Company name is too long."),
  nameAr: z.string().trim().max(120).optional(),
  contactInfo: z
    .string()
    .trim()
    .max(180, "Contact info is too long.")
    .optional(),
  contactInfoAr: z.string().trim().max(180).optional(),
});

type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export async function listCompanies() {
  noStore();

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("companies")
      .select("id, name, name_ar, contact_info, contact_info_ar, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return {
        companies: [] as CompanyRow[],
        error: "Could not load companies from database.",
      };
    }

    return {
      companies: data ?? [],
      error: "",
    };
  } catch {
    return {
      companies: [] as CompanyRow[],
      error: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function listCompaniesPaginated(page: number, pageSize: number, query = "") {
  noStore();

  try {
    const supabase = getSupabaseAdminClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const result = query
      ? await supabase
          .from("companies")
          .select("id, name, name_ar, contact_info, contact_info_ar, created_at", { count: "exact" })
          .or(`name.ilike.%${query}%,contact_info.ilike.%${query}%`)
          .order("created_at", { ascending: false })
          .range(from, to)
      : await supabase
          .from("companies")
          .select("id, name, name_ar, contact_info, contact_info_ar, created_at", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

    if (result.error) {
      return { companies: [] as CompanyRow[], total: 0, error: "Could not load companies from database." };
    }

    return { companies: result.data ?? [], total: result.count ?? 0, error: "" };
  } catch {
    return { companies: [] as CompanyRow[], total: 0, error: "Database is not configured. Add Supabase env values." };
  }
}

export async function createCompany(input: CreateCompanyInput) {
  const parsed = createCompanySchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Invalid company input.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("companies").insert({
      name: parsed.data.name,
      name_ar: parsed.data.nameAr || null,
      contact_info: parsed.data.contactInfo || null,
      contact_info_ar: parsed.data.contactInfoAr || null,
    });

    if (error) {
      return {
        ok: false,
        message: "Could not create company. Please check DB setup.",
      };
    }

    return {
      ok: true,
      message: "Company added successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function deleteCompany(companyId: string) {
  const idCheck = z.string().uuid("Invalid company id.").safeParse(companyId);

  if (!idCheck.success) {
    return {
      ok: false,
      message: "Invalid company id.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("companies").delete().eq("id", companyId);

    if (error) {
      return {
        ok: false,
        message:
          "Could not delete company. Remove linked customers before deletion.",
      };
    }

    return {
      ok: true,
      message: "Company deleted successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Database is not configured. Add Supabase env values.",
    };
  }
}
