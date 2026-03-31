"use client";

import { useFormStatus } from "react-dom";

export function CompanySubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="primary-button w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving Company..." : "Save Company"}
    </button>
  );
}
