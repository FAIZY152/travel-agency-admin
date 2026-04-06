import Image from "next/image";
import Link from "next/link";
import { deleteCustomerAction } from "@/app/dashboard/customers/actions";
import { CustomerEditForm } from "@/components/customer-edit-form";
import { Pagination } from "@/components/pagination";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";
import { CUSTOMERS_PAGE_SIZE } from "@/lib/customers/shared";
import { listCompanies } from "@/lib/data/companies";
import { getCustomerById, listCustomersPaginated } from "@/lib/data/customers";
import { getCustomerDocumentHref } from "@/lib/document-view-route";

type SearchParamValue = string | string[] | undefined;

function readParam(value: SearchParamValue, fallback = ""): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] || fallback;
  return fallback;
}

function buildCustomerListUrl(
  baseUrl: string,
  params: Record<string, string | undefined>,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    searchParams.set(key, value);
  }

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export async function CustomerListPageContent({
  baseUrl,
  searchParams,
}: {
  baseUrl: string;
  searchParams: Record<string, SearchParamValue>;
}) {
  const status = readParam(searchParams.status);
  const errorMessage = readParam(searchParams.error);
  const editCustomerId = readParam(searchParams.edit);
  const query = readParam(searchParams.query).trim();
  const requestedPage = Math.max(
    1,
    parseInt(readParam(searchParams.page, "1"), 10) || 1,
  );

  const [
    { customers, total, totalPages, page, error: customersError },
    { companies, error: companiesError },
    editCustomerResult,
  ] = await Promise.all([
    listCustomersPaginated(requestedPage, CUSTOMERS_PAGE_SIZE, query),
    listCompanies(),
    editCustomerId
      ? getCustomerById(editCustomerId)
      : Promise.resolve({ customer: null, error: "" }),
  ]);

  const editCustomer = editCustomerResult.customer;
  const editNotFound = Boolean(editCustomerId) && !editCustomer;
  const listUrl = buildCustomerListUrl(baseUrl, {
    page: String(page),
    query: query || undefined,
  });
  const extraParams: Record<string, string> = {};
  if (query) {
    extraParams.query = query;
  }

  const successMessage =
    status === "created"
      ? "Customer added successfully."
      : status === "updated"
        ? "Customer updated successfully."
        : status === "deleted"
          ? "Customer deleted successfully."
          : "";

  const alertMessage =
    errorMessage ||
    customersError ||
    companiesError ||
    (editNotFound ? editCustomerResult.error || "Selected customer for edit was not found." : "");

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
              Browse and manage customer records with server-side pagination.
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

      {alertMessage ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {alertMessage}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: query ? "Matching Customers" : "Total Customers",
            value: total,
            color: "#182533",
          },
          {
            label: "Customers This Page",
            value: customers.length,
            color: "#8d5d24",
          },
          {
            label: "Current Page",
            value: page,
            color: "#0f766e",
          },
          {
            label: "Total Pages",
            value: totalPages,
            color: "#b91c1c",
          },
        ].map((stat) => (
          <article key={stat.label} className="panel rounded-[28px] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
              {stat.label}
            </p>
            <p className="mt-4 text-4xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </article>
        ))}
      </section>

      {editCustomer ? (
        <article className="panel rounded-[30px] p-6 ring-1 ring-amber-200 shadow-[0_24px_60px_-45px_rgba(200,138,61,0.65)]">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-[#19303d]">Edit Customer</h2>
            <Link href={listUrl} className="secondary-button px-4 py-2.5 text-sm">
              Cancel
            </Link>
          </div>

          <CustomerEditForm
            companies={companies}
            customer={editCustomer}
            returnTo={listUrl}
          />
        </article>
      ) : null}

      <article className="panel rounded-[30px] p-6 ring-1 ring-slate-200 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[#19303d]">All Customers</h2>
          <form action={baseUrl} className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
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

        {customers.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-muted">
            {query ? "No customers matched your search." : "No customers yet. Add your first customer."}
          </div>
        ) : (
          <>
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
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <div className="flex items-start gap-3">
                            <Image
                              src={buildCloudinaryImageUrl(customer.imageUrl, { width: 160 })}
                              alt={customer.name}
                              width={56}
                              height={56}
                              className="h-14 w-14 rounded-2xl object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold text-[#19303d]">{customer.name}</p>
                              <p className="mt-1 text-sm text-muted">
                                {customer.occupation || "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm text-[#19303d]">{customer.companyName || "—"}</td>
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
                              href={getCustomerDocumentHref(customer.id)}
                              className="secondary-button px-3 py-2 text-xs text-[#0f766e]"
                            >
                              View
                            </Link>
                            <Link
                              href={buildCustomerListUrl(baseUrl, {
                                edit: customer.id,
                                page: String(page),
                                query: query || undefined,
                              })}
                              className="secondary-button px-3 py-2 text-xs"
                            >
                              Edit
                            </Link>
                            <form action={deleteCustomerAction}>
                              <input type="hidden" name="customerId" value={customer.id} />
                              <input type="hidden" name="returnTo" value={listUrl} />
                              <button type="submit" className="danger-button">Delete</button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:hidden">
              {customers.map((customer) => (
                <article
                  key={customer.id}
                  className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_60px_-48px_rgba(15,23,42,0.35)]"
                >
                  <div className="grid gap-4 p-4 sm:grid-cols-[140px_1fr]">
                    <Image
                      src={buildCloudinaryImageUrl(customer.imageUrl, { width: 320 })}
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
                        <p>Company: {customer.companyName || "—"}</p>
                        <p>ID: {customer.idNumber || "—"}</p>
                        <p>Certificate No: {customer.healthCertNumber || "—"}</p>
                        <p>Certificate Expiry: {customer.healthCertExpiry || "—"}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Link
                          href={getCustomerDocumentHref(customer.id)}
                          className="secondary-button px-3 py-2 text-xs text-[#0f766e]"
                        >
                          View
                        </Link>
                        <Link
                          href={buildCustomerListUrl(baseUrl, {
                            edit: customer.id,
                            page: String(page),
                            query: query || undefined,
                          })}
                          className="secondary-button px-3 py-2 text-xs"
                        >
                          Edit
                        </Link>
                        <form action={deleteCustomerAction}>
                          <input type="hidden" name="customerId" value={customer.id} />
                          <input type="hidden" name="returnTo" value={listUrl} />
                          <button type="submit" className="danger-button">Delete</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <Pagination
              page={page}
              total={total}
              pageSize={CUSTOMERS_PAGE_SIZE}
              baseUrl={baseUrl}
              extraParams={extraParams}
            />
          </>
        )}
      </article>
    </div>
  );
}
