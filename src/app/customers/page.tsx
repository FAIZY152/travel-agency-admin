// @ts-nocheck
"use client";
import { useState } from "react";

const mockStats = {
  companiesCount: 12,
  customersCount: 148,
  recentCompanies: [
    { id: 1, name: "Horizon Travel Group", createdAt: "2026-03-20" },
    { id: 2, name: "Apex Voyages Ltd.", createdAt: "2026-03-15" },
    { id: 3, name: "Meridian Global Tours", createdAt: "2026-03-10" },
  ],
  recentCustomers: [
    { id: "c1", name: "Ayaan Khan", createdAt: "2026-03-27" },
    { id: "c2", name: "Sara Mirza", createdAt: "2026-03-26" },
    { id: "c3", name: "Bilal Raza", createdAt: "2026-03-25" },
    { id: "c4", name: "Nadia Farooq", createdAt: "2026-03-24" },
  ],
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

const navSections = [
  {
    title: "Workspace",
    items: [
      { href: "overview", label: "Overview", note: "Counts, status, quick actions", icon: "⊞" },
      { href: "add-company", label: "Add Company", note: "Register a new partner", icon: "＋" },
      { href: "company-list", label: "Company List", note: "Browse and clean records", icon: "≡" },
      { href: "add-customer", label: "Add Customer", note: "Create a new document record", icon: "＋" },
      { href: "all-customers", label: "All Customers", note: "Edit, view document, delete", icon: "≡" },
    ],
  },
];

function ChevronRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 10l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sidebar({ activeItem, setActiveItem, collapsed, setCollapsed }) {
  return (
    <aside
      className={`flex flex-col h-full transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
      style={{
        background: "linear-gradient(160deg, #0d1f2d 0%, #0a3d2e 60%, #0d2a1f 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial accent */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,118,110,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo / Branding */}
      <div className="relative flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div
          className="flex items-center justify-center shrink-0 rounded-xl font-black text-sm"
          style={{
            width: 40, height: 40,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#fff",
            letterSpacing: "0.05em",
            boxShadow: "0 4px 14px rgba(16,185,129,0.4)",
          }}
        >
          TA
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.38)", fontSize: 9 }}>
              Admin Center
            </p>
            <p className="text-white font-bold text-base leading-tight truncate" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}>
              Travel Agency
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto shrink-0 flex items-center justify-center rounded-lg transition-colors"
          style={{
            width: 28, height: 28,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d={collapsed ? "M4 2l4 4-4 4" : "M8 2L4 6l4 4"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Status pills */}
      {!collapsed && (
        <div className="flex gap-2 px-5 py-4">
          {[
            { label: "Auth", value: "Single Admin" },
            { label: "Verify", value: "Public QR" },
          ].map((p) => (
            <div
              key={p.label}
              className="flex-1 rounded-xl px-3 py-2.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)", fontSize: 9 }}>
                {p.label}
              </p>
              <p className="text-white text-xs font-semibold mt-1" style={{ fontSize: 11 }}>
                {p.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 pb-4 space-y-1 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p
                className="px-2 mb-2 mt-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.28)", fontSize: 9 }}
              >
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => setActiveItem(item.href)}
                  className="w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all group"
                  style={{
                    background: isActive ? "rgba(16,185,129,0.18)" : "transparent",
                    border: isActive ? "1px solid rgba(16,185,129,0.3)" : "1px solid transparent",
                    cursor: "pointer",
                    marginBottom: 2,
                  }}
                >
                  <span
                    className="shrink-0 flex items-center justify-center rounded-lg text-xs font-bold"
                    style={{
                      width: 32, height: 32,
                      background: isActive ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.06)",
                      color: isActive ? "#34d399" : "rgba(255,255,255,0.45)",
                      border: isActive ? "1px solid rgba(16,185,129,0.35)" : "1px solid rgba(255,255,255,0.08)",
                      fontSize: 14,
                    }}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-sm font-semibold truncate"
                        style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.72)" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="block text-xs truncate"
                        style={{ color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.32)", fontSize: 11 }}
                      >
                        {item.note}
                      </span>
                    </span>
                  )}
                  {!collapsed && isActive && (
                    <span style={{ color: "#34d399", opacity: 0.7 }}>
                      <ChevronRight />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Session footer */}
      {!collapsed && (
        <div
          className="mx-3 mb-4 rounded-xl px-4 py-4"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.28)", fontSize: 9 }}>
            Session
          </p>
          <p className="text-xs leading-5 mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            Protected routes stay behind a JWT cookie. Public verification stays outside the admin wall.
          </p>
          <button
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-colors"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.65)",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8 6.5H2m0 0l2-2m-2 2l2 2M5 2H11v9H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Log Out
          </button>
        </div>
      )}
    </aside>
  );
}

function StatCard({ label, value, hint, color, badge }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #e8edf2",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8", fontSize: 10 }}>
          {label}
        </p>
        {badge && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
            style={badge.style}
          >
            <TrendUp /> {badge.text}
          </span>
        )}
      </div>
      <p className="text-4xl font-bold" style={{ color, lineHeight: 1, letterSpacing: "-0.03em" }}>
        {value}
      </p>
      <p className="text-xs leading-5" style={{ color: "#94a3b8" }}>
        {hint}
      </p>
    </div>
  );
}

function DashboardMain() {
  const { companiesCount, customersCount, recentCompanies, recentCustomers } = mockStats;

  const setupState =
    companiesCount === 0
      ? { label: "Create your first company", description: "Start by adding at least one company so customer records have a valid parent organization.", action: "Add Company" }
      : customersCount === 0
      ? { label: "Create your first customer", description: "Your company registry is ready. Add the first customer record to unlock the document and QR flow.", action: "Add Customer" }
      : { label: "Operations are active", description: "Your admin workspace is live. You can manage records, open document views, print, and verify publicly.", action: "Open Customers" };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl px-7 py-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(120deg, #f0fdf9 0%, #f8faff 60%, #fff9f0 100%)",
          border: "1px solid #d1fae5",
        }}
      >
        <div
          style={{
            position: "absolute", right: -40, top: -60,
            width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="flex flex-wrap items-start justify-between gap-4 relative">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#059669", fontSize: 10 }}>
              Admin Dashboard
            </p>
            <h1
              className="text-3xl font-bold"
              style={{ color: "#0f1f2d", letterSpacing: "-0.03em", fontFamily: "Georgia, serif" }}
            >
              Travel Agency Control Center
            </h1>
            <p className="mt-2 text-sm leading-6 max-w-xl" style={{ color: "#64748b" }}>
              Manage companies, create customers, open print-ready documents, and publish trusted QR verification pages — all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 3px 10px rgba(16,185,129,0.35)", cursor: "pointer", border: "none" }}
            >
              <span style={{ fontSize: 16, fontWeight: 700 }}>+</span> Add Customer
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#334155", cursor: "pointer" }}
            >
              Add Company
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <StatCard
          label="Companies"
          value={companiesCount}
          hint="Partner organizations registered"
          color="#0f1f2d"
          badge={{ text: "+2 this week", style: { background: "#f0fdf9", color: "#059669", border: "1px solid #a7f3d0" } }}
        />
        <StatCard
          label="Customers"
          value={customersCount}
          hint="Records currently in the system"
          color="#0f1f2d"
          badge={{ text: "+14 this month", style: { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" } }}
        />
        <StatCard
          label="Recent Companies"
          value={recentCompanies.length}
          hint="Newest partner organizations"
          color="#059669"
          badge={{ text: "Updated this week", style: { background: "#f0fdf9", color: "#059669", border: "1px solid #a7f3d0" } }}
        />
        <StatCard
          label="Recent Customers"
          value={recentCustomers.length}
          hint="Latest customer entries"
          color="#dc2626"
          badge={{ text: "Active flow", style: { background: "#fff1f2", color: "#dc2626", border: "1px solid #fecaca" } }}
        />
      </div>

      {/* Setup Step + Quick Access */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
        {/* Recommended Next Step */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e8edf2", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#94a3b8", fontSize: 10 }}>
                Recommended Next Step
              </p>
              <h2 className="text-xl font-bold" style={{ color: "#0f1f2d", letterSpacing: "-0.02em" }}>
                {setupState.label}
              </h2>
            </div>
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 3px 10px rgba(16,185,129,0.3)", border: "none", cursor: "pointer" }}
            >
              {setupState.action}
            </button>
          </div>
          <p className="text-sm leading-6 mb-5" style={{ color: "#64748b" }}>
            {setupState.description}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "1. Company Setup", description: "Register partner companies once so all new customer records can be linked correctly." },
              { title: "2. Customer Entry", description: "Add a customer with identity details, certificate details, and image upload." },
              { title: "3. Document View", description: "Open the generated customer document to review the printable layout and QR code." },
              { title: "4. Public Verify", description: "Anyone scanning the QR lands on the public verification page outside the admin wall." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-xl p-4"
                style={{ background: i % 2 === 0 ? "#f8fafc" : "#f0fdf9", border: "1px solid", borderColor: i % 2 === 0 ? "#e2e8f0" : "#d1fae5" }}
              >
                <p className="text-sm font-semibold mb-1.5" style={{ color: "#1d3146" }}>{item.title}</p>
                <p className="text-xs leading-5" style={{ color: "#64748b" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e8edf2", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#94a3b8", fontSize: 10 }}>
            Quick Access
          </p>
          <div className="space-y-2.5">
            {[
              { title: "Company List", note: "Review active partner organizations and clean unused records.", accent: "#10b981" },
              { title: "All Customers", note: "Find records quickly and jump into edit, document, or delete actions.", accent: "#2563eb" },
              { title: "New Customer", note: "Use the guided form to create a document-ready customer profile.", accent: "#f59e0b" },
            ].map((item) => (
              <button
                key={item.title}
                className="w-full text-left rounded-xl px-4 py-4 flex items-center justify-between gap-3 transition-all group"
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="shrink-0 rounded-lg"
                    style={{ width: 8, height: 8, background: item.accent, borderRadius: "50%", boxShadow: `0 0 0 3px ${item.accent}22` }}
                  />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#19303d" }}>{item.title}</p>
                    <p className="text-xs leading-5 mt-0.5" style={{ color: "#94a3b8" }}>{item.note}</p>
                  </div>
                </div>
                <span style={{ color: "#94a3b8" }}><ChevronRight /></span>
              </button>
            ))}
          </div>

          {/* Activity summary */}
          <div
            className="mt-4 rounded-xl px-4 py-4 flex items-center gap-4"
            style={{ background: "#f0fdf9", border: "1px solid #d1fae5" }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48">
              <rect x="8" y="12" width="32" height="24" rx="8" fill="#dcfce7" />
              <path d="M16 24h16M16 19h10M16 29h8" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-sm font-bold" style={{ color: "#065f46" }}>Activity Snapshot</p>
              <p className="text-xs leading-5 mt-0.5" style={{ color: "#059669" }}>
                {recentCustomers.length} recent customers · {recentCompanies.length} recent companies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Companies + Recent Customers */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Recent Companies */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e8edf2", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#94a3b8", fontSize: 10 }}>
                Recent Companies
              </p>
              <h2 className="text-lg font-bold" style={{ color: "#182533", letterSpacing: "-0.02em" }}>
                Latest partner records
              </h2>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", cursor: "pointer" }}
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {recentCompanies.map((company, i) => (
              <div
                key={company.id}
                className="flex items-center justify-between gap-3 rounded-xl px-4 py-3.5"
                style={{ background: "#f8fafc", border: "1px solid #e8edf2" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 text-xs font-bold"
                    style={{
                      width: 32, height: 32,
                      background: ["#f0fdf9", "#eff6ff", "#fff9f0"][i % 3],
                      color: ["#059669", "#2563eb", "#d97706"][i % 3],
                      border: `1px solid ${["#d1fae5", "#bfdbfe", "#fde68a"][i % 3]}`,
                    }}
                  >
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#19303d" }}>{company.name}</p>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>Created {formatDate(company.createdAt)}</p>
                  </div>
                </div>
                <button className="text-xs font-semibold" style={{ color: "#d97706", background: "none", border: "none", cursor: "pointer" }}>
                  Open →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e8edf2", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#94a3b8", fontSize: 10 }}>
                Recent Customers
              </p>
              <h2 className="text-lg font-bold" style={{ color: "#182533", letterSpacing: "-0.02em" }}>
                Latest customer entries
              </h2>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", cursor: "pointer" }}
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {recentCustomers.map((customer, i) => (
              <div
                key={customer.id}
                className="flex items-center justify-between gap-3 rounded-xl px-4 py-3.5"
                style={{ background: "#f8fafc", border: "1px solid #e8edf2" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 text-xs font-bold"
                    style={{
                      width: 32, height: 32,
                      background: ["#f0fdf9", "#eff6ff", "#fff9f0", "#fef2f2"][i % 4],
                      color: ["#059669", "#2563eb", "#d97706", "#dc2626"][i % 4],
                      border: `1px solid ${["#d1fae5", "#bfdbfe", "#fde68a", "#fecaca"][i % 4]}`,
                    }}
                  >
                    {(customer.name || "?").split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#19303d" }}>{customer.name || "Unnamed customer"}</p>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>Added {formatDate(customer.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-xs font-semibold" style={{ color: "#059669", background: "none", border: "none", cursor: "pointer" }}>
                    Document
                  </button>
                  <button className="text-xs font-semibold" style={{ color: "#d97706", background: "none", border: "none", cursor: "pointer" }}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeItem, setActiveItem] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "#f1f5f9", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <main className="flex-1 p-6 overflow-y-auto" style={{ minHeight: "100vh" }}>
        <DashboardMain />
      </main>
    </div>
  );
}
