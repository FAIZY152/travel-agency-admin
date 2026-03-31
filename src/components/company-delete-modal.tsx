"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteCompanyAction } from "@/app/dashboard/companies/actions";

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="danger-button disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Delete Company"}
    </button>
  );
}

export function CompanyDeleteModal({
  companyId,
  companyName,
  returnTo,
}: {
  companyId: string;
  companyName: string;
  returnTo: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="danger-button"
      >
        Delete
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.55)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8d5d24]">
                  Delete Company
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#19303d]">
                  Confirm deletion
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="secondary-button px-3 py-2 text-xs"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">
              Delete <span className="font-semibold text-[#19303d]">{companyName}</span> from the company list?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              If this company is linked to customers, deletion will fail until those records are removed or changed.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="secondary-button"
              >
                Cancel
              </button>

              <form action={deleteCompanyAction}>
                <input type="hidden" name="companyId" value={companyId} />
                <input type="hidden" name="returnTo" value={returnTo} />
                <DeleteSubmitButton />
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
