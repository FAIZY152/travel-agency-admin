import "server-only";
import { randomUUID } from "node:crypto";
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
  companyNameAr: string | null;
  companyContactInfo: string | null;
  name: string;
  nameAr: string | null;
  passport: string;
  jobTitle: string;
  jobTitleAr: string | null;
  issueDate: string;
  expiryDate: string;
  imageUrl: string;
  qrToken: string;
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
  healthCertExpiryHijri: string | null;
  healthCertExpiryGregorian: string | null;
  eduProgramEnd: string | null;
  eduProgramEndGregorian: string | null;
  eduProgramType: string | null;
  facilityName: string | null;
  licenseNumber: string | null;
  facilityNumber: string | null;
};

const customerInputSchema = z
  .object({
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
    issueDate: z.iso.date("Issue date is required."),
    expiryDate: z.iso.date("Expiry date is required."),
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
    healthCertExpiryHijri: z.string().trim().max(60).optional(),
    healthCertExpiryGregorian: z.string().trim().max(60).optional(),
    eduProgramEnd: z.string().trim().max(60).optional(),
    eduProgramEndGregorian: z.string().trim().max(60).optional(),
    eduProgramType: z.string().trim().max(120).optional(),
    facilityName: z.string().trim().max(200).optional(),
    licenseNumber: z.string().trim().max(60).optional(),
    facilityNumber: z.string().trim().max(60).optional(),
  })
  .refine(
    (value) => new Date(value.expiryDate).getTime() > new Date(value.issueDate).getTime(),
    {
      message: "Expiry date must be after issue date.",
      path: ["expiryDate"],
    },
  );

export type CustomerInput = z.infer<typeof customerInputSchema>;

function sanitizeCustomerRow(
  row: CustomerRow,
  companiesById: Map<string, CompanyRow>,
): CustomerListItem | null {
  if (!row.name || !row.issue_date || !row.expiry_date || !row.image_url) {
    return null;
  }

  const company = row.company_id ? companiesById.get(row.company_id) : null;

  return {
    id: row.id,
    companyId: row.company_id,
    companyName: company?.name || "Unknown company",
    companyNameAr: company?.name_ar || null,
    companyContactInfo: company?.contact_info || null,
    name: row.name,
    nameAr: row.name_ar || null,
    passport: row.passport || "",
    jobTitle: row.job_title || "",
    jobTitleAr: row.job_title_ar || null,
    issueDate: row.issue_date,
    expiryDate: row.expiry_date,
    imageUrl: row.image_url,
    qrToken: row.qr_token || "",
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
    healthCertExpiryHijri: row.health_cert_expiry_hijri || null,
    healthCertExpiryGregorian: row.health_cert_expiry_gregorian || null,
    eduProgramEnd: row.edu_program_end || null,
    eduProgramEndGregorian: row.edu_program_end_gregorian || null,
    eduProgramType: row.edu_program_type || null,
    facilityName: row.facility_name || null,
    licenseNumber: row.license_number || null,
    facilityNumber: row.facility_number || null,
  };
}

async function ensureCustomerQrToken(
  customerId: string,
  currentToken: string | null,
) {
  if (currentToken) {
    return currentToken;
  }

  const supabase = getSupabaseAdminClient();
  const qrToken = randomUUID();
  const { error } = await supabase
    .from("customers")
    .update({ qr_token: qrToken })
    .eq("id", customerId);

  if (error) {
    return "";
  }

  return qrToken;
}

const CUSTOMERS_COLS =
  "id, company_id, name, name_ar, passport, job_title, job_title_ar, issue_date, expiry_date, image_url, qr_token, created_at, municipal, honesty, id_number, nationality, sex, occupation, health_cert_number, health_cert_expiry, health_cert_issue_hijri, health_cert_issue_gregorian, health_cert_expiry_hijri, health_cert_expiry_gregorian, edu_program_end, edu_program_end_gregorian, edu_program_type, facility_name, license_number, facility_number";

export async function listCustomers() {
  noStore();

  try {
    const supabase = getSupabaseAdminClient();
    const [customersResult, companiesResult] = await Promise.all([
      supabase
        .from("customers")
        .select(CUSTOMERS_COLS)
        .order("created_at", { ascending: false }),
      supabase.from("companies").select("id, name, name_ar, contact_info, contact_info_ar, created_at"),
    ]);

    if (customersResult.error || companiesResult.error) {
      return {
        customers: [] as CustomerListItem[],
        error: "Could not load customers from database.",
      };
    }

    const companiesById = new Map(
      (companiesResult.data ?? []).map((company) => [company.id, company]),
    );

    const normalizedCustomers = (customersResult.data ?? [])
      .map((row) => sanitizeCustomerRow(row, companiesById))
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
      supabase.from("companies").select("id, name, name_ar, contact_info, contact_info_ar, created_at"),
    ]);

    if (customersResult.error || companiesResult.error) {
      return { customers: [] as CustomerListItem[], total: 0, error: "Could not load customers from database." };
    }

    const companiesById = new Map(
      (companiesResult.data ?? []).map((c) => [c.id, c]),
    );

    const customers = (customersResult.data ?? [])
      .map((row) => sanitizeCustomerRow(row, companiesById))
      .filter((row): row is CustomerListItem => Boolean(row));

    return { customers, total: customersResult.count ?? 0, error: "" };
  } catch {
    return { customers: [] as CustomerListItem[], total: 0, error: "Database is not configured. Add Supabase env values." };
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
      issue_date: payload.issueDate,
      expiry_date: payload.expiryDate,
      image_url: payload.imageUrl,
      qr_token: randomUUID(),
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
      health_cert_expiry_hijri: payload.healthCertExpiryHijri || null,
      health_cert_expiry_gregorian: payload.healthCertExpiryGregorian || null,
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
        issue_date: payload.issueDate,
        expiry_date: payload.expiryDate,
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
        health_cert_expiry_hijri: payload.healthCertExpiryHijri || null,
        health_cert_expiry_gregorian: payload.healthCertExpiryGregorian || null,
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

    const { data: companies, error: companiesError } = await supabase
      .from("companies")
      .select("id, name, name_ar, contact_info, contact_info_ar, created_at");

    if (companiesError) {
      return {
        customer: null as CustomerListItem | null,
        error: "Could not load company details.",
      };
    }

    const companiesById = new Map((companies ?? []).map((company) => [company.id, company]));
    const normalizedCustomer = sanitizeCustomerRow(customer, companiesById);

    if (!normalizedCustomer) {
      return {
        customer: null as CustomerListItem | null,
        error: "Customer record is incomplete.",
      };
    }

    const qrToken = await ensureCustomerQrToken(customer.id, customer.qr_token);
    if (!qrToken) {
      return {
        customer: null as CustomerListItem | null,
        error: "Could not generate QR token for this customer.",
      };
    }

    return {
      customer: {
        ...normalizedCustomer,
        qrToken,
      },
      error: "",
    };
  } catch {
    return {
      customer: null as CustomerListItem | null,
      error: "Database is not configured. Add Supabase env values.",
    };
  }
}

export async function getCustomerByQrToken(qrToken: string) {
  noStore();

  const tokenCheck = z.string().trim().min(1, "Invalid QR token.").safeParse(qrToken);
  if (!tokenCheck.success) {
    return {
      customer: null as CustomerListItem | null,
      error: "Invalid QR token.",
    };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select(CUSTOMERS_COLS)
      .eq("qr_token", tokenCheck.data)
      .maybeSingle();

    if (customerError || !customer) {
      return {
        customer: null as CustomerListItem | null,
        error: "Verification record not found.",
      };
    }

    const { data: companies, error: companiesError } = await supabase
      .from("companies")
      .select("id, name, name_ar, contact_info, contact_info_ar, created_at");

    if (companiesError) {
      return {
        customer: null as CustomerListItem | null,
        error: "Could not load company details.",
      };
    }

    const companiesById = new Map((companies ?? []).map((company) => [company.id, company]));
    const normalizedCustomer = sanitizeCustomerRow(customer, companiesById);

    if (!normalizedCustomer) {
      return {
        customer: null as CustomerListItem | null,
        error: "Customer record is incomplete.",
      };
    }

    return {
      customer: {
        ...normalizedCustomer,
        qrToken: customer.qr_token || "",
      },
      error: "",
    };
  } catch {
    return {
      customer: null as CustomerListItem | null,
      error: "Database is not configured. Add Supabase env values.",
    };
  }
}
