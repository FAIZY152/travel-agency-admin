"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className = "" }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      startTransition(() => {
        router.replace("/login");
        router.refresh();
      });
    }
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading}
      className={`inline-flex items-center justify-center rounded-2xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm font-semibold text-[#19303d] hover:bg-[#fff8ee] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
