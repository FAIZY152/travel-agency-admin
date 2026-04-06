import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import {
  CUSTOMERS_PAGE_SIZE,
  EMPTY_CUSTOMER_IMAGE_DATA_URL,
  type CustomerListItem,
} from "@/lib/customers/shared";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];
type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];

const customerInputSchema = z.object({
  companyId: z.string().trim().optional().default(""),
  name: z.string().trim().optional().default(""),
  nameAr: z.string().trim().max(120).optional(),
  passport: z.string().trim().max(60).optional().default(""),
  jobTitle: z.string().trim().max(120).optional().default(""),
  jobTitleAr: z.string().trim().max(120).optional(),
  imageUrl: z.string().trim().optional().default(""),
  municipal: z.string().trim().max(200).optional(),
  honesty: z.string().trim().max(200).optional(),
  idNumber: z.string().trim().max(60).optional(),
  nationality: z.string().trim().max(100).optional(),
  sex: z.string().trim().max(20).optional(),
  occupation: z.string().trim().max(120).optional(),
  healthCertNumber: z.string().trim().max(60).optional(),
  healthCertExpiryHijri: z.string().trim().max(60).optional(),
  healthCertExpiry: z.string().trim().max(60).optional(),
  healthCertIssueHijri: z.string().trim().max(60).optional(),
  healthCertIssueGregorian: z.string().trim().max(60).optional(),
  eduProgramEnd: z.string().trim().max(60).optional(),
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
  const company = row.company_id ? companiesById.get(row.company_id) : null;

  return {
    id: row.id,
    companyId: row.company_id,
    companyName: company?.name || "",
    name: row.name || "",
    nameAr: row.name_ar || null,
    passport: row.passport || "",
    jobTitle: row.job_title || "",
    jobTitleAr: row.job_title_ar || null,
    imageUrl: row.image_url || EMPTY_CUSTOMER_IMAGE_DATA_URL,
    createdAt: row.created_at,
    municipal: row.municipal || null,
    honesty: row.honesty || null,
    idNumber: row.id_number || null,
    nationality: row.nationality || null,
    sex: row.sex || null,
    occupation: row.occupation || row.job_title || null,
    healthCertNumber: row.health_cert_number || null,
    healthCertExpiryHijri: row.health_cert_expiry_hijri || null,
    healthCertExpiry: row.health_cert_expiry || null,
    healthCertIssueHijri: row.health_cert_issue_hijri || null,
    healthCertIssueGregorian: row.health_cert_issue_gregorian || null,
    eduProgramEnd: row.edu_program_end || null,
    eduProgramType: row.edu_program_type || null,
    facilityName: row.facility_name || null,
    licenseNumber: row.license_number || null,
    facilityNumber: row.facility_number || null,
  };
}

const CUSTOMERS_COLS =
  "id, company_id, name, name_ar, passport, job_title, job_title_ar, image_url, created_at, municipal, honesty, id_number, nationality, sex, occupation, health_cert_number, health_cert_expiry_hijri, health_cert_expiry, health_cert_issue_hijri, health_cert_issue_gregorian, edu_program_end, edu_program_type, facility_name, license_number, facility_number";

function normalizePage(value: number) {
  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }

  return Math.floor(value);
}

function normalizePageSize(value: number) {
  if (!Number.isFinite(value) || value < 1) {
    return CUSTOMERS_PAGE_SIZE;
  }

  return Math.min(100, Math.floor(value));
}

function buildCustomerSearchFilter(query: string) {
  const normalizedQuery = query.trim();
  return `name.ilike.%${normalizedQuery}%,id_number.ilike.%${normalizedQuery}%,nationality.ilike.%${normalizedQuery}%`;
}

async function loadCompaniesByIds(companyIds: Array<string | null>) {
  const normalizedIds = Array.from(
    new Set(
      companyIds.filter((companyId): companyId is string => Boolean(companyId)),
    ),
  );

  if (normalizedIds.length === 0) {
    return {
      companiesById: new Map<string, CompanyRow>(),
      error: false,
    };
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, created_at")
    .in("id", normalizedIds);

  if (error) {
    return {
      companiesById: new Map<string, CompanyRow>(),
      error: true,
    };
  }

  return {
    companiesById: new Map((data ?? []).map((company) => [company.id, company])),
    error: false,
  };
}

function sanitizeCustomerRows(
  rows: CustomerRow[],
  companiesById: Map<string, CompanyRow>,
) {
  return rows
    .map((row) => sanitizeCustomerRow(row, companiesById))
    .filter((row): row is CustomerListItem => Boolean(row));
}

async function fetchCustomersPage(
  page: number,
  pageSize: number,
  query: string,
) {
  const supabase = getSupabaseAdminClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const normalizedQuery = query.trim();

  const request = supabase
    .from("customers")
    .select(CUSTOMERS_COLS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!normalizedQuery) {
    return request;
  }

  return request.or(buildCustomerSearchFilter(normalizedQuery));
}

export async function listCustomers() {
  noStore();

  try {
    const supabase = getSupabaseAdminClient();
    const customersResult = await supabase
      .from("customers")
      .select(CUSTOMERS_COLS)
      .order("created_at", { ascending: false });

    if (customersResult.error) {
      return {
        customers: [] as CustomerListItem[],
        error: "Could not load customers from database.",
      };
    }

    const companiesResult = await loadCompaniesByIds(
      (customersResult.data ?? []).map((row) => row.company_id),
    );

    if (companiesResult.error) {
      return {
        customers: [] as CustomerListItem[],
        error: "Could not load customers from database.",
      };
    }

    const normalizedCustomers = sanitizeCustomerRows(
      customersResult.data ?? [],
      companiesResult.companiesById,
    );

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
    const requestedPage = normalizePage(page);
    const normalizedPageSize = normalizePageSize(pageSize);
    const normalizedQuery = query.trim();

    let customersResult = await fetchCustomersPage(
      requestedPage,
      normalizedPageSize,
      normalizedQuery,
    );

    if (customersResult.error) {
      return {
        customers: [] as CustomerListItem[],
        total: 0,
        totalPages: 1,
        page: 1,
        pageSize: normalizedPageSize,
        error: "Could not load customers from database.",
      };
    }

    const total = customersResult.count ?? 0;
    const totalPages =
      total === 0 ? 1 : Math.max(1, Math.ceil(total / normalizedPageSize));
    const currentPage = Math.min(requestedPage, totalPages);

    if (currentPage !== requestedPage) {
      customersResult = await fetchCustomersPage(
        currentPage,
        normalizedPageSize,
        normalizedQuery,
      );

      if (customersResult.error) {
        return {
          customers: [] as CustomerListItem[],
          total: 0,
          totalPages: 1,
          page: 1,
          pageSize: normalizedPageSize,
          error: "Could not load customers from database.",
        };
      }
    }

    const companiesResult = await loadCompaniesByIds(
      (customersResult.data ?? []).map((row) => row.company_id),
    );

    if (companiesResult.error) {
      return {
        customers: [] as CustomerListItem[],
        total: 0,
        totalPages: 1,
        page: 1,
        pageSize: normalizedPageSize,
        error: "Could not load customers from database.",
      };
    }

    const customers = sanitizeCustomerRows(
      customersResult.data ?? [],
      companiesResult.companiesById,
    );

    return {
      customers,
      total,
      totalPages,
      page: currentPage,
      pageSize: normalizedPageSize,
      error: "",
    };
  } catch {
    return {
      customers: [] as CustomerListItem[],
      total: 0,
      totalPages: 1,
      page: 1,
      pageSize: normalizePageSize(pageSize),
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
      company_id: payload.companyId || null,
      name: payload.name,
      name_ar: payload.nameAr || null,
      passport: payload.passport || "",
      job_title: payload.jobTitle || "",
      job_title_ar: payload.jobTitleAr || null,
      image_url: payload.imageUrl || "",
      municipal: payload.municipal || null,
      honesty: payload.honesty || null,
      id_number: payload.idNumber || null,
      nationality: payload.nationality || null,
      sex: payload.sex || null,
      occupation: payload.occupation || null,
      health_cert_number: payload.healthCertNumber || null,
      health_cert_expiry_hijri: payload.healthCertExpiryHijri || null,
      health_cert_expiry: payload.healthCertExpiry || null,
      health_cert_issue_hijri: payload.healthCertIssueHijri || null,
      health_cert_issue_gregorian: payload.healthCertIssueGregorian || null,
      edu_program_end: payload.eduProgramEnd || null,
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
        company_id: payload.companyId || null,
        name: payload.name,
        name_ar: payload.nameAr || null,
        passport: payload.passport || "",
        job_title: payload.jobTitle || "",
        job_title_ar: payload.jobTitleAr || null,
        image_url: payload.imageUrl || "",
        municipal: payload.municipal || null,
        honesty: payload.honesty || null,
        id_number: payload.idNumber || null,
        nationality: payload.nationality || null,
        sex: payload.sex || null,
        occupation: payload.occupation || null,
        health_cert_number: payload.healthCertNumber || null,
        health_cert_expiry_hijri: payload.healthCertExpiryHijri || null,
        health_cert_expiry: payload.healthCertExpiry || null,
        health_cert_issue_hijri: payload.healthCertIssueHijri || null,
        health_cert_issue_gregorian: payload.healthCertIssueGregorian || null,
        edu_program_end: payload.eduProgramEnd || null,
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

  return getCustomerById(customerId);
}

export async function getCustomerById(customerId: string) {
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

    const companiesResult = await loadCompaniesByIds([customer.company_id]);

    if (companiesResult.error) {
      return {
        customer: null as CustomerListItem | null,
        error: "Could not load company details.",
      };
    }

    const normalizedCustomer = sanitizeCustomerRow(
      customer,
      companiesResult.companiesById,
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
