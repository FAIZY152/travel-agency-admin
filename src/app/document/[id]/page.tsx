import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CustomerDocumentSheet } from "@/components/customer-document-sheet";
import { PrintButton } from "@/components/print-button";
import { getCustomerDocumentById } from "@/lib/data/customers";
import { buildVerificationUrl, getRequestOrigin } from "@/lib/document";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;
  const { customer, error } = await getCustomerDocumentById(id);

  if (!customer) {
    notFound();
  }

  const requestHeaders = await headers();
  const origin = getRequestOrigin(requestHeaders);
  const verifyUrl = buildVerificationUrl(origin, customer.qrToken);

  return (
    <div className="app-backdrop min-h-screen px-2 sm:px-4 py-2  lg:px-8 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 print:max-w-none">
        {/* <header className="panel mesh-card flex flex-wrap items-center justify-between gap-4 rounded-4xl px-6 py-5 print:hidden">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#182533]">
              Customer Document
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Printable travel document with QR verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/customers"
              className="inline-flex items-center justify-center rounded-2xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm font-semibold text-[#7a5527] transition hover:bg-[#fff8ee]"
            >
              Back to Customers
            </Link>
          </div>
        </header> */}
            <PrintButton />

        {error ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 print:hidden">
            {error}
          </div>
        ) : null}

        <CustomerDocumentSheet
          customer={customer}
          verifyUrl={verifyUrl}
          eyebrow="Document View"
          title="Travel Agency Customer Document"
        />
      </div>
    </div>
  );
}
