"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [apiError, setApiError] = useState("");
  const nextPath = searchParams.get("next");
  const redirectTarget =
    nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")
      ? nextPath
      : "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setApiError(payload?.message || "Login failed.");
        return;
      }

      startTransition(() => {
        router.replace(redirectTarget);
        router.refresh();
      });
    } catch {
      setApiError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app-backdrop relative isolate min-h-screen overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-6xl items-center justify-center">
        <section className="panel mesh-card grid w-full overflow-hidden rounded-[40px] lg:grid-cols-[1.08fr_0.92fr]">
          <aside className="relative hidden overflow-hidden bg-[linear-gradient(165deg,_#10263b_0%,_#12364c_58%,_#0f766e_100%)] p-10 text-white lg:block">
            <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]">
              Admin Access
            </p>
            <h1 className="font-display text-4xl leading-tight">
              Single-admin auth should feel invisible, not heavy.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
              This screen is only the gatekeeper. After login, the real product starts: company records, customer documents, QR verification, and printing.
            </p>

            <div className="mt-10 grid gap-3">
              {[
                "Check email and password against `.env.local`",
                "Store JWT in an httpOnly cookie",
                "Redirect to protected admin route",
                "Keep `/verify/[token]` public for QR scans",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <main className="p-8 sm:p-10 lg:p-12">
            <div className="max-w-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
                Secure Sign-In
              </p>
              <h2 className="mt-3 font-display text-4xl text-[#182533]">
                Admin Login
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Use the admin credentials from your environment file. No signup, no roles, no complexity.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="panel-soft rounded-[24px] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                    Flow
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#19303d]">
                    Landing → Login → Dashboard
                  </p>
                </div>
                <div className="panel-soft rounded-[24px] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                    Redirect
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#19303d]">
                    {redirectTarget}
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="field-input"
                  placeholder="admin@gmail.com"
                />
                {errors.email ? (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="field-input"
                  placeholder="Enter password"
                />
                {errors.password ? (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              {apiError ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {apiError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="primary-button w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Login to Dashboard"}
              </button>

              <div className="flex items-center justify-between gap-4 text-xs font-medium text-muted">
                <p>Credentials are checked only on the server.</p>
                <Link href="/" className="text-[#8d5d24] hover:text-[#6f481d]">
                  Back to landing
                </Link>
              </div>
            </form>
          </main>
        </section>
      </div>
    </div>
  );
}
