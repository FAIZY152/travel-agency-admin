import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

type DashboardStats = {
  companiesCount: number;
  customersCount: number;
  validDocumentsCount: number;
  expiredDocumentsCount: number;
  recentCompanies: Array<{ id: string; name: string; createdAt: string }>;
  recentCustomers: Array<{
    id: string;
    name: string | null;
    companyId: string | null;
    createdAt: string;
  }>;
  warning: string;
};

async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const supabase = getSupabaseAdminClient();
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(
      new Date(),
    );

    // 2 queries instead of 6 — compute counts from the fetched rows in JS
    const [companiesResult, customersResult] = await Promise.all([
      supabase
        .from("companies")
        .select("id, name, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("customers")
        .select("id, name, company_id, expiry_date, created_at")
        .order("created_at", { ascending: false }),
    ]);

    if (companiesResult.error || customersResult.error) {
      return {
        companiesCount: 0,
        customersCount: 0,
        validDocumentsCount: 0,
        expiredDocumentsCount: 0,
        recentCompanies: [],
        recentCustomers: [],
        warning: "Some data could not load. Verify Supabase tables.",
      };
    }

    const companies = companiesResult.data ?? [];
    const customers = customersResult.data ?? [];

    const validCount = customers.filter(
      (c) => c.expiry_date && c.expiry_date >= today,
    ).length;

    return {
      companiesCount: companies.length,
      customersCount: customers.length,
      validDocumentsCount: validCount,
      expiredDocumentsCount: customers.length - validCount,
      recentCompanies: companies.slice(0, 4).map((c) => ({
        id: c.id,
        name: c.name,
        createdAt: c.created_at,
      })),
      recentCustomers: customers.slice(0, 5).map((c) => ({
        id: c.id,
        name: c.name,
        companyId: c.company_id,
        createdAt: c.created_at,
      })),
      warning: "",
    };
  } catch {
    return {
      companiesCount: 0,
      customersCount: 0,
      validDocumentsCount: 0,
      expiredDocumentsCount: 0,
      recentCompanies: [],
      recentCustomers: [],
      warning: "Database is not configured. Add Supabase env values.",
    };
  }
}

// Cache for 30 seconds — dashboard feels instant on repeat visits
// Invalidated automatically when customers/companies are mutated via revalidatePath
export const getDashboardStats = unstable_cache(
  fetchDashboardStats,
  ["dashboard-stats"],
  { revalidate: 30, tags: ["dashboard"] },
);
