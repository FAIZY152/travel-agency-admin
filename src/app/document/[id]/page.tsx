import { notFound } from "next/navigation";
import { CustomerDocumentSheet } from "@/components/customer-document-sheet";
import { getCustomerDocumentById } from "@/lib/data/customers";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;
  const { customer } = await getCustomerDocumentById(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className=" min-h-screen px-2 sm:px-4 py-2  lg:px-8  print:px-0 print:py-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 print:max-w-none">
        <CustomerDocumentSheet customer={customer} />
      </div>
    </div>
  );
}
