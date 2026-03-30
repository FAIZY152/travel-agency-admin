"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    note: "Dashboard home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    href: "/dashboard/companies/add",
    label: "Add Company",
    note: "Register a new partner",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/companies/list",
    label: "Company List",
    note: "Browse all companies",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2.5 5h13M2.5 9h13M2.5 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/customers/add",
    label: "Add Customer",
    note: "Create new document",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 16c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 12v4M11 14h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/customers/list",
    label: "All Customers",
    note: "Edit, view, delete",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 16c0-2.5 2.2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="13" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13 10.5c1.5 0 2.8.6 3.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white"
      style={{
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top glow effect */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Logo / Brand */}
        <div className="p-5">
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-black"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#fff",
                  boxShadow: "0 6px 20px rgba(16,185,129,0.38)",
                  letterSpacing: "0.04em",
                }}
              >
                TA
              </div>
              <div className="min-w-0">
                <p
                  className="font-semibold uppercase tracking-widest"
                  style={{ fontSize: 9, color: "rgba(255,255,255,0.38)" }}
                >
                  Admin Center
                </p>
                <p
                  className="mt-0.5 truncate text-lg font-bold leading-tight text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.01em" }}
                >
                  Travel Agency
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-150"
                style={
                  active
                    ? {
                        background: "rgba(16,185,129,0.16)",
                        border: "1px solid rgba(16,185,129,0.28)",
                        color: "#fff",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid transparent",
                        color: "rgba(255,255,255,0.68)",
                      }
                }
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={
                    active
                      ? {
                          background: "rgba(16,185,129,0.22)",
                          border: "1px solid rgba(16,185,129,0.32)",
                          color: "#34d399",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.42)",
                        }
                  }
                >
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className="block truncate text-sm font-semibold"
                    style={{ color: active ? "#fff" : "rgba(255,255,255,0.75)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="mt-0.5 block truncate"
                    style={{
                      fontSize: 11,
                      color: active
                        ? "rgba(255,255,255,0.48)"
                        : "rgba(255,255,255,0.32)",
                    }}
                  >
                    {item.note}
                  </span>
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{
                    color: active ? "#34d399" : "rgba(255,255,255,0.25)",
                  }}
                >
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            );
          })}
        </nav>

        {/* Session Footer */}
        <div className="p-3">
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="font-semibold uppercase tracking-widest"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.28)" }}
            >
              Session
            </p>
            <p className="mt-2 text-xs leading-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              Protected routes secured with JWT. Public verify stays open.
            </p>
            <div className="mt-3">
              <LogoutButton className="w-full justify-center border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
