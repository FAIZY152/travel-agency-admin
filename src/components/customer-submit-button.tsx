"use client";

import { useFormStatus } from "react-dom";

export function CustomerSubmitButton({
  disabled,
  uploading,
}: {
  disabled: boolean;
  uploading: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="primary-button w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    >
      {uploading ? "Uploading image..." : pending ? "Saving Customer..." : "Save Customer"}
    </button>
  );
}
