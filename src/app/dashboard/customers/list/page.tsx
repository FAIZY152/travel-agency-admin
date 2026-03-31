import Image from "next/image";
import Link from "next/link";
import { listCustomers } from "@/lib/data/customers";
import { listCompanies } from "@/lib/data/companies";
import { deleteCustomerAction, updateCustomerAction } from "@/app/dashboard/customers/actions";

function readParam(value: string | string[] | undefined, fallback = ""): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] || fallback;
  return fallback;
}

export default async function CustomerListPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const status = readParam(searchParams.status);
  const errorMessage = readParam(searchParams.error);
  const editCustomerId = readParam(searchParams.edit);
  const query = readParam(searchParams.query).trim().toLowerCase();

  const [{ customers, error: customersError }, { companies, error: companiesError }] =
    await Promise.all([listCustomers(), listCompanies()]);

  const editCustomer = customers.find((c) => c.id === editCustomerId);
  const editNotFound = editCustomerId && !editCustomer;
  const isEditing = Boolean(editCustomer);

  const filteredCustomers = customers.filter((c) => {
    if (!query) return true;
    return [c.name, c.idNumber, c.nationality, c.companyName]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const customersWithCertificates = customers.filter(
    (c) => Boolean(c.healthCertNumber),
  ).length;

  const successMessage =
    status === "created"
      ? "Customer added successfully."
      : status === "updated"
        ? "Customer updated successfully."
        : status === "deleted"
          ? "Customer deleted successfully."
          : "";

  return (
    <div className="space-y-6">
      <header className="panel mesh-card rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
              Customers
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#182533]">All Customers</h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Browse and manage all customer records.
            </p>
          </div>
          <Link href="/dashboard/customers/add" className="primary-button self-start">
            Add Customer
          </Link>
        </div>
      </header>

      {successMessage ? (
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {errorMessage || customersError || companiesError || editNotFound ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage || customersError || companiesError || "Selected customer for edit was not found."}
        </div>
      ) : null}

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Customers", value: customers.length, color: "#182533" },
          { label: "Total Companies", value: companies.length, color: "#0f766e" },
          { label: "With Certificate No.", value: customersWithCertificates, color: "#b91c1c" },
          { label: "Filtered Result", value: filteredCustomers.length, color: "#182533" },
        ].map((s) => (
          <article key={s.label} className="panel rounded-[28px] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">{s.label}</p>
            <p className="mt-4 text-4xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </article>
        ))}
      </section>

      {/* Edit Form */}
      {isEditing && editCustomer && (
        <article className="panel rounded-[30px] p-6 ring-1 ring-amber-200 shadow-[0_24px_60px_-45px_rgba(200,138,61,0.65)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2 className="text-2xl font-semibold text-[#19303d]">Edit Customer</h2>
            <Link href="/dashboard/customers/list" className="secondary-button px-4 py-2.5 text-sm">
              Cancel
            </Link>
          </div>

          <form action={updateCustomerAction} className="space-y-4">
            <input type="hidden" name="customerId" value={editCustomer.id} />
            <input type="hidden" name="returnTo" value="/dashboard/customers/list" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-companyId" className="field-label">Company</label>
                <select id="e-companyId" name="companyId" required defaultValue={editCustomer.companyId || ""} className="field-input bg-white">
                  <option value="">Select Company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="e-municipal" className="field-label">Municipal</label>
                <input id="e-municipal" name="municipal" defaultValue={editCustomer.municipal || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-honesty" className="field-label">honesty</label>
                <input id="e-honesty" name="honesty" defaultValue={editCustomer.honesty || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-idNumber" className="field-label">ID Number</label>
                <input id="e-idNumber" name="idNumber" defaultValue={editCustomer.idNumber || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-name" className="field-label">the name</label>
                <input id="e-name" name="name" required defaultValue={editCustomer.name} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-nationality" className="field-label">Nationality</label>
                <input id="e-nationality" name="nationality" defaultValue={editCustomer.nationality || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-sex" className="field-label">Sex</label>
                <input id="e-sex" name="sex" defaultValue={editCustomer.sex || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-occupation" className="field-label">Occupation</label>
                <input id="e-occupation" name="occupation" defaultValue={editCustomer.occupation || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-healthCertNumber" className="field-label">Health certificate number</label>
                <input id="e-healthCertNumber" name="healthCertNumber" defaultValue={editCustomer.healthCertNumber || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-healthCertExpiry" className="field-label">Health certificate expiration date</label>
                <input id="e-healthCertExpiry" name="healthCertExpiry" defaultValue={editCustomer.healthCertExpiry || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-healthCertIssueHijri" className="field-label">Date of issuance (Hijri)</label>
                <input id="e-healthCertIssueHijri" name="healthCertIssueHijri" defaultValue={editCustomer.healthCertIssueHijri || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-healthCertIssueGregorian" className="field-label">Date of issuance (Gregorian)</label>
                <input id="e-healthCertIssueGregorian" name="healthCertIssueGregorian" defaultValue={editCustomer.healthCertIssueGregorian || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-eduProgramEnd" className="field-label">End date of educational program</label>
                <input id="e-eduProgramEnd" name="eduProgramEnd" defaultValue={editCustomer.eduProgramEnd || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-eduProgramEndGregorian" className="field-label">End date of educational program (Gregorian)</label>
                <input id="e-eduProgramEndGregorian" name="eduProgramEndGregorian" defaultValue={editCustomer.eduProgramEndGregorian || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-eduProgramType" className="field-label">Type of educational program</label>
                <input id="e-eduProgramType" name="eduProgramType" defaultValue={editCustomer.eduProgramType || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-facilityName" className="field-label">Facility Name</label>
                <input id="e-facilityName" name="facilityName" defaultValue={editCustomer.facilityName || ""} className="field-input" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="e-licenseNumber" className="field-label">license number</label>
                <input id="e-licenseNumber" name="licenseNumber" defaultValue={editCustomer.licenseNumber || ""} className="field-input" />
              </div>
              <div>
                <label htmlFor="e-facilityNumber" className="field-label">No. facility</label>
                <input id="e-facilityNumber" name="facilityNumber" defaultValue={editCustomer.facilityNumber || ""} className="field-input" />
              </div>
            </div>

            {/* Keep existing imageUrl */}
            <input type="hidden" name="imageUrl" value={editCustomer.imageUrl} />

            <button type="submit" className="primary-button w-full sm:w-auto">
              Update Customer
            </button>
          </form>
        </article>
      )}

      {/* Search + List */}
      <article className="panel rounded-[30px] p-6 ring-1 ring-slate-200 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[#19303d]">All Customers</h2>
          <form action="/dashboard/customers/list" className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <input
              type="search"
              name="query"
              defaultValue={query}
              placeholder="Search by name, ID, nationality..."
              className="field-input min-w-[240px] sm:w-[300px]"
            />
            <button type="submit" className="secondary-button">Filter</button>
          </form>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-muted">
            {query ? "No customers matched your search." : "No customers yet. Add your first customer."}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200 xl:block">
              <div className="overflow-x-auto">
                <table className="data-table bg-white">
                  <thead className="surface-muted text-left">
                    <tr>
                      <th>Customer</th>
                      <th>Company</th>
                      <th>ID / Nationality</th>
                      <th>Certificate</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => {
                      return (
                        <tr key={customer.id}>
                          <td>
                            <div className="flex items-start gap-3">
                              <Image
                                src={customer.imageUrl}
                                alt={customer.name}
                                width={56}
                                height={56}
                                className="h-14 w-14 rounded-2xl object-cover"
                              />
                              <div>
                                <p className="text-sm font-semibold text-[#19303d]">{customer.name}</p>
                                <p className="mt-1 text-sm text-muted">{customer.occupation || "—"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-sm text-[#19303d]">{customer.companyName}</td>
                          <td className="text-sm text-muted">
                            <p>{customer.idNumber || "—"}</p>
                            <p className="mt-1">{customer.nationality || "—"}</p>
                          </td>
                          <td className="text-sm text-muted">
                            <p>No: {customer.healthCertNumber || "—"}</p>
                            <p className="mt-1">Expiry: {customer.healthCertExpiry || "—"}</p>
                          </td>
                          <td>
                            <div className="flex flex-wrap justify-end gap-2">
                              <Link
                                href={`/document/${customer.id}`}
                                className="secondary-button px-3 py-2 text-xs text-[#0f766e]"
                              >
                                View
                              </Link>
                              <Link
                                href={`/dashboard/customers/list?edit=${customer.id}`}
                                className="secondary-button px-3 py-2 text-xs"
                              >
                                Edit
                              </Link>
                              <form action={deleteCustomerAction}>
                                <input type="hidden" name="customerId" value={customer.id} />
                                <input type="hidden" name="returnTo" value="/dashboard/customers/list" />
                                <button type="submit" className="danger-button">Delete</button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="mt-6 grid gap-4 xl:hidden">
              {filteredCustomers.map((customer) => {
                return (
                  <article
                    key={customer.id}
                    className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_60px_-48px_rgba(15,23,42,0.35)]"
                  >
                    <div className="grid gap-4 p-4 sm:grid-cols-[140px_1fr]">
                      <Image
                        src={customer.imageUrl}
                        alt={customer.name}
                        width={320}
                        height={260}
                        className="h-36 w-full rounded-[22px] object-cover"
                      />
                      <div className="space-y-3">
                        <div>
                          <p className="text-xl font-semibold text-[#19303d]">{customer.name}</p>
                          <p className="mt-1 text-sm text-muted">{customer.nationality || "—"}</p>
                        </div>
                        <div className="grid gap-2 text-sm text-[#19303d] sm:grid-cols-2">
                          <p>Company: {customer.companyName}</p>
                          <p>ID: {customer.idNumber || "—"}</p>
                          <p>Certificate No: {customer.healthCertNumber || "—"}</p>
                          <p>Certificate Expiry: {customer.healthCertExpiry || "—"}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Link href={`/document/${customer.id}`} className="secondary-button px-3 py-2 text-xs text-[#0f766e]">
                            View
                          </Link>
                          <Link href={`/dashboard/customers/list?edit=${customer.id}`} className="secondary-button px-3 py-2 text-xs">
                            Edit
                          </Link>
                          <form action={deleteCustomerAction}>
                            <input type="hidden" name="customerId" value={customer.id} />
                            <input type="hidden" name="returnTo" value="/dashboard/customers/list" />
                            <button type="submit" className="danger-button">Delete</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </article>
    </div>
  );
}
