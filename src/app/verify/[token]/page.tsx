import Link from "next/link";
import { headers } from "next/headers";
import { CustomerDocumentSheet } from "@/components/customer-document-sheet";
import { getCustomerByQrToken } from "@/lib/data/customers";
import { buildVerificationUrl, getRequestOrigin } from "@/lib/document";

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function VerifyPage({ params }: PageProps) {
  const { token } = await params;
  const { customer, error } = await getCustomerByQrToken(token);

  if (!customer) {
    return (
      <div className="app-backdrop min-h-screen px-6 py-10 sm:px-10">
        <div className="panel mesh-card mx-auto max-w-3xl rounded-[32px] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d5d24]">
            Public Verify
          </p>
          <h1 className="mt-3 font-display text-4xl text-[#182533]">
            Verification record not found
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            {error || "This QR code does not match an active customer record."}
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
            >
              Back to Landing Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const requestHeaders = await headers();
  const origin = getRequestOrigin(requestHeaders);
  const verifyUrl = buildVerificationUrl(origin, customer.qrToken);

  return (
    <div className="app-backdrop min-h-screen px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="panel mesh-card rounded-[32px] px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
            Milestone 5
          </p>
          <h1 className="mt-3 font-display text-4xl text-[#182533]">
            Public Verification
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            This document was validated through the customer QR token.
          </p>
        </header>

        <CustomerDocumentSheet
          customer={customer}
          verifyUrl={verifyUrl}
          eyebrow="Public Verify"
          title="Verified Travel Document"
        />
      </div>
    </div>
  );
}
