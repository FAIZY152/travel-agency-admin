import { CustomerListPageContent } from "@/components/customer-list-page-content";

export default async function CustomerPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;

  return (
    <CustomerListPageContent
      baseUrl="/dashboard/customers"
      searchParams={searchParams}
    />
  );
}
