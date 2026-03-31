import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];
type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];

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
  healthCertExpiry: string | null;
  healthCertIssueHijri: string | null;
  healthCertIssueGregorian: string | null;
  eduProgramEnd: string | null;
  eduProgramEndGregorian: string | null;
  eduProgramType: string | null;
  facilityName: string | null;
  licenseNumber: string | null;
  facilityNumber: string | null;
};

const customerInputSchema = z.object({
  companyId: z.string().uuid("Select a valid company."),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(120, "Name is too long."),
  nameAr: z.string().trim().max(120).optional(),
  passport: z.string().trim().max(60).optional().default(""),
  jobTitle: z.string().trim().max(120).optional().default(""),
  jobTitleAr: z.string().trim().max(120).optional(),
  imageUrl: z.url("Upload a valid image first."),
  municipal: z.string().trim().max(200).optional(),
  honesty: z.string().trim().max(200).optional(),
  idNumber: z.string().trim().max(60).optional(),
  nationality: z.string().trim().max(100).optional(),
  sex: z.string().trim().max(20).optional(),
  occupation: z.string().trim().max(120).optional(),
  healthCertNumber: z.string().trim().max(60).optional(),
  healthCertExpiry: z.string().trim().max(60).optional(),
  healthCertIssueHijri: z.string().trim().max(60).optional(),
  healthCertIssueGregorian: z.string().trim().max(60).optional(),
  eduProgramEnd: z.string().trim().max(60).optional(),
  eduProgramEndGregorian: z.string().trim().max(60).optional(),
  eduProgramType: z.string().trim().max(120).optional(),
  facilityName: z.string().trim().max(200).optional(),
  licenseNumber: z.string().trim().max(60).optional(),
  facilityNumber: z.string().trim().max(60).optional(),
});

export type CustomerInput = z.infer<typeof customerInputSchema>;

function sanitizeCustomerRow(
  row: CustomerRow,
  companiesById: Map<string, CompanyRow>,
): CustomerListItem | null {
  if (!row.name || !row.image_url) {
    return null;
  }

  const company = row.company_id ? companiesById.get(row.company_id) : null;

  return {
    id: row.id,
    companyId: row.company_id,
    companyName: company?.name || "Unknown company",
    name: row.name,
    nameAr: row.name_ar || null,
    passport: row.passport || "",
    jobTitle: row.job_title || "",
    jobTitleAr: row.job_title_ar || null,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    municipal: row.municipal || null,
    honesty: row.honesty || null,
    idNumber: row.id_number || null,
    nationality: row.nationality || null,
    sex: row.sex || null,
    occupation: row.occupation || null,
    healthCertNumber: row.health_cert_number || null,
    healthCertExpiry: row.health_cert_expiry || null,
    healthCertIssueHijri: row.health_cert_issue_hijri || null,
    healthCertIssueGregorian: row.health_cert_issue_gregorian || null,
    eduProgramEnd: row.edu_program_end || null,
    eduProgramEndGregorian: row.edu_program_end_gregorian || null,
    eduProgramType: row.edu_program_type || null,
    facilityName: row.facility_name || null,
    licenseNumber: row.license_number || null,
    facilityNumber: row.facility_number || null,
  };
}

const CUSTOMERS_COLS =
  "id, company_id, name, name_ar, passport, job_title, job_title_ar, image_url, created_at, municipal, honesty, id_number, nationality, sex, occupation, health_cert_number, health_cert_expiry, health_cert_issue_hijri, health_cert_issue_gregorian, edu_program_end, edu_program_end_gregorian, edu_program_type, facility_name, license_number, facility_number";

async function loadCompaniesById() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, created_at");

  if (error) {
    return { companiesById: new Map<string, CompanyRow>(), error: true };
  }

  return {
    companiesById: new Map((data ?? []).map((company) => [company.id, company])),
    error: false,
  };
}

async function loadCompanyById(companyId: string | null) {
  if (!companyId) {
    return {
      company: null as CompanyRow | null,
      error: false,
    };
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, created_at")
    .eq("id", companyId)
    .maybeSingle();

  return {
    company: error ? null : data,
    error: Boolean(error),
  };
}

export async function listCustomers() {
  noStore();

  try {
    const supabase = getSupabaseAdminClient();
    const [customersResult, companiesResult] = await Promise.all([
      supabase
        .from("customers")
        .select(CUSTOMERS_COLS)
        .order("created_at", { ascending: false }),
      loadCompaniesById(),
    ]);

    if (customersResult.error || companiesResult.error) {
      return {
        customers: [] as CustomerListItem[],
        error: "Could not load customers from database.",
      };
    }

    const normalizedCustomers = (customersResult.data ?? [])
      .map((row) => sanitizeCustomerRow(row, companiesResult.companiesById))
      .filter((row): row is CustomerListItem => Boolean(row));

    return {
      customers: normalizedCustomers,
      error: "",
    };
  } catch {
    return {
      customers: [] as CustomerListItem[],
      error: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function listCustomersPaginated(page: number, pageSize: number, query = "") {
  noStore();

  try {
    const supabase = getSupabaseAdminClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const [customersResult, companiesResult] = await Promise.all([
      query
        ? supabase
            .from("customers")
            .select(CUSTOMERS_COLS, { count: "exact" })
            .or(`name.ilike.%${query}%,id_number.ilike.%${query}%,nationality.ilike.%${query}%`)
            .order("created_at", { ascending: false })
            .range(from, to)
        : supabase
            .from("customers")
            .select(CUSTOMERS_COLS, { count: "exact" })
            .order("created_at", { ascending: false })
            .range(from, to),
      loadCompaniesById(),
    ]);

    if (customersResult.error || companiesResult.error) {
      return {
        customers: [] as CustomerListItem[],
        total: 0,
        error: "Could not load customers from database.",
      };
    }

    const customers = (customersResult.data ?? [])
      .map((row) => sanitizeCustomerRow(row, companiesResult.companiesById))
      .filter((row): row is CustomerListItem => Boolean(row));

    return {
      customers,
      total: customersResult.count ?? 0,
      error: "",
    };
  } catch {
    return {
      customers: [] as CustomerListItem[],
      total: 0,
      error: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function createCustomer(input: CustomerInput) {
  const parsed = customerInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Invalid customer input.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const payload = parsed.data;
    const { error } = await supabase.from("customers").insert({
      company_id: payload.companyId,
      name: payload.name,
      name_ar: payload.nameAr || null,
      passport: payload.passport || "",
      job_title: payload.jobTitle || "",
      job_title_ar: payload.jobTitleAr || null,
      image_url: payload.imageUrl,
      municipal: payload.municipal || null,
      honesty: payload.honesty || null,
      id_number: payload.idNumber || null,
      nationality: payload.nationality || null,
      sex: payload.sex || null,
      occupation: payload.occupation || null,
      health_cert_number: payload.healthCertNumber || null,
      health_cert_expiry: payload.healthCertExpiry || null,
      health_cert_issue_hijri: payload.healthCertIssueHijri || null,
      health_cert_issue_gregorian: payload.healthCertIssueGregorian || null,
      edu_program_end: payload.eduProgramEnd || null,
      edu_program_end_gregorian: payload.eduProgramEndGregorian || null,
      edu_program_type: payload.eduProgramType || null,
      facility_name: payload.facilityName || null,
      license_number: payload.licenseNumber || null,
      facility_number: payload.facilityNumber || null,
    });

    if (error) {
      return {
        ok: false,
        message: "Could not create customer. Please check DB setup.",
      };
    }

    return {
      ok: true,
      message: "Customer added successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function updateCustomer(customerId: string, input: CustomerInput) {
  const idCheck = z.string().uuid("Invalid customer id.").safeParse(customerId);

  if (!idCheck.success) {
    return {
      ok: false,
      message: "Invalid customer id.",
    };
  }

  const parsed = customerInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Invalid customer input.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const payload = parsed.data;
    const { error } = await supabase
      .from("customers")
      .update({
        company_id: payload.companyId,
        name: payload.name,
        name_ar: payload.nameAr || null,
        passport: payload.passport || "",
        job_title: payload.jobTitle || "",
        job_title_ar: payload.jobTitleAr || null,
        image_url: payload.imageUrl,
        municipal: payload.municipal || null,
        honesty: payload.honesty || null,
        id_number: payload.idNumber || null,
        nationality: payload.nationality || null,
        sex: payload.sex || null,
        occupation: payload.occupation || null,
        health_cert_number: payload.healthCertNumber || null,
        health_cert_expiry: payload.healthCertExpiry || null,
        health_cert_issue_hijri: payload.healthCertIssueHijri || null,
        health_cert_issue_gregorian: payload.healthCertIssueGregorian || null,
        edu_program_end: payload.eduProgramEnd || null,
        edu_program_end_gregorian: payload.eduProgramEndGregorian || null,
        edu_program_type: payload.eduProgramType || null,
        facility_name: payload.facilityName || null,
        license_number: payload.licenseNumber || null,
        facility_number: payload.facilityNumber || null,
      })
      .eq("id", customerId);

    if (error) {
      return {
        ok: false,
        message: "Could not update customer. Please check DB setup.",
      };
    }

    return {
      ok: true,
      message: "Customer updated successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function deleteCustomer(customerId: string) {
  const idCheck = z.string().uuid("Invalid customer id.").safeParse(customerId);

  if (!idCheck.success) {
    return {
      ok: false,
      message: "Invalid customer id.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("customers").delete().eq("id", customerId);

    if (error) {
      return {
        ok: false,
        message: "Could not delete customer. Please try again.",
      };
    }

    return {
      ok: true,
      message: "Customer deleted successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function getCustomerDocumentById(customerId: string) {
  noStore();

  const idCheck = z.string().uuid("Invalid customer id.").safeParse(customerId);

  if (!idCheck.success) {
    return {
      customer: null as CustomerListItem | null,
      error: "Invalid customer id.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select(CUSTOMERS_COLS)
      .eq("id", customerId)
      .maybeSingle();

    if (customerError || !customer) {
      return {
        customer: null as CustomerListItem | null,
        error: "Customer not found.",
      };
    }

    const companyResult = await loadCompanyById(customer.company_id);

    if (companyResult.error) {
      return {
        customer: null as CustomerListItem | null,
        error: "Could not load company details.",
      };
    }

    const normalizedCustomer = sanitizeCustomerRow(
      customer,
      new Map(companyResult.company ? [[companyResult.company.id, companyResult.company]] : []),
    );

    if (!normalizedCustomer) {
      return {
        customer: null as CustomerListItem | null,
        error: "Customer record is incomplete.",
      };
    }

    return {
      customer: normalizedCustomer,
      error: "",
    };
  } catch {
    return {
      customer: null as CustomerListItem | null,
      error: "Database is not configured. Add Supabase env values.",
    };
  }
}
