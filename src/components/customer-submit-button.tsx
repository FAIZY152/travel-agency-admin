"use client";

import { useFormStatus } from "react-dom";

export function CustomerSubmitButton({
  disabled,
  uploading,
  idleLabel = "Save Customer",
  pendingLabel = "Saving Customer...",
  uploadingLabel = "Uploading image...",
  className = "primary-button w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
}: {
  disabled: boolean;
  uploading: boolean;
  idleLabel?: string;
  pendingLabel?: string;
  uploadingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={className}
    >
      {uploading ? uploadingLabel : pending ? pendingLabel : idleLabel}
    </button>
  );
}
