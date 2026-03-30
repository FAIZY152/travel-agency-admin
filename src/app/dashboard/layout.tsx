import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#f1f5f9" }}>
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto pl-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
