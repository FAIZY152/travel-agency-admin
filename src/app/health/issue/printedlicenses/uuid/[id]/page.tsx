import { CustomerDocumentViewPage } from "@/components/customer-document-view-page";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PrintedLicensePage({ params }: PageProps) {
  const { id } = await params;

  return <CustomerDocumentViewPage id={id} />;
}
