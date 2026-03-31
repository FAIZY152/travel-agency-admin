import { createCompanyAction } from "@/app/dashboard/companies/actions";
import { CompanySubmitButton } from "@/components/company-submit-button";

export function AddCompanyForm({ returnTo }: { returnTo: string }) {
  return (
    <form action={createCompanyAction} className="mt-6 space-y-4">
      <input type="hidden" name="returnTo" value={returnTo} />

      <div>
        <label htmlFor="name" className="field-label">
          Company Name (العربية)
        </label>
        <input
          id="name"
          name="name"
          required
          className="field-input"
          placeholder="اسم الشركة"
          dir="rtl"
        />
      </div>

      <CompanySubmitButton />
    </form>
  );
}
