import { redirect } from "next/navigation";
import { getCustomerDocumentHref } from "@/lib/document-view-route";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentRedirectPage({ params }: PageProps) {
  const { id } = await params;

  redirect(getCustomerDocumentHref(id));
}
