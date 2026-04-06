import { CustomerListPageContent } from "@/components/customer-list-page-content";

export default async function CustomerListPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;

  return (
    <CustomerListPageContent
      baseUrl="/dashboard/customers/list"
      searchParams={searchParams}
    />
  );
}
