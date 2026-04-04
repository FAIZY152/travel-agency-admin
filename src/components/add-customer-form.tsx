"use client";

import { useState } from "react";
import { CustomerImageUpload } from "@/components/customer-image-upload";
import { CustomerSubmitButton } from "@/components/customer-submit-button";
import { createCustomerAction } from "@/app/dashboard/customers/actions";

type Company = { id: string; name: string };

export function AddCustomerForm({
  companies,
  returnTo = "/dashboard/customers",
}: {
  companies: Company[];
  returnTo?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const customerButtonDisabled = uploading;

  return (
    <form action={createCustomerAction} className="space-y-4">
      <input type="hidden" name="returnTo" value={returnTo} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="companyId" className="field-label">Company</label>
          <select id="companyId" name="companyId" className="field-input bg-white">
            <option value="">Leave Empty</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="municipal" className="field-label">Municipal</label>
          <input id="municipal" name="municipal" className="field-input" placeholder="Municipal" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="honesty" className="field-label">Honesty</label>
          <input id="honesty" name="honesty" className="field-input" placeholder="Honesty" />
        </div>
        <div>
          <label htmlFor="idNumber" className="field-label">ID Number</label>
          <input id="idNumber" name="idNumber" className="field-input" placeholder="Enter ID Number" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">Name</label>
          <input id="name" name="name" className="field-input" placeholder="Leave empty if not available" />
        </div>
        <div>
          <label htmlFor="nationality" className="field-label">Nationality</label>
          <input id="nationality" name="nationality" className="field-input" placeholder="Nationality" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sex" className="field-label">Sex</label>
          <input id="sex" name="sex" className="field-input" placeholder="Sex" />
        </div>
        <div>
          <label htmlFor="occupation" className="field-label">Occupation</label>
          <input id="occupation" name="occupation" className="field-input" placeholder="Occupation" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="healthCertNumber" className="field-label">Health certificate number</label>
          <input id="healthCertNumber" name="healthCertNumber" className="field-input" placeholder="Health certificate number" />
        </div>
        <div>
          <label htmlFor="healthCertExpiryHijri" className="field-label">Health certificate expiry date (Hijri)</label>
          <input id="healthCertExpiryHijri" name="healthCertExpiryHijri" className="field-input" placeholder="Health certificate expiry date (Hijri)" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="healthCertExpiry" className="field-label">Health certificate expiry date (Gregorian)</label>
          <input id="healthCertExpiry" name="healthCertExpiry" className="field-input" placeholder="Health certificate expiry date (Gregorian)" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="healthCertIssueHijri" className="field-label">Health certificate issue date (Hijri)</label>
          <input id="healthCertIssueHijri" name="healthCertIssueHijri" className="field-input" placeholder="Health certificate issue date (Hijri)" />
        </div>
        <div>
          <label htmlFor="healthCertIssueGregorian" className="field-label">Health certificate issue date (Gregorian)</label>
          <input id="healthCertIssueGregorian" name="healthCertIssueGregorian" className="field-input" placeholder="Health certificate issue date (Gregorian)" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="eduProgramEnd" className="field-label">Educational program end date (Hijri)</label>
          <input id="eduProgramEnd" name="eduProgramEnd" className="field-input" placeholder="Educational program end date (Hijri)" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="eduProgramType" className="field-label">Type of educational program</label>
          <input id="eduProgramType" name="eduProgramType" className="field-input" placeholder="Type of educational program" />
        </div>
        <div>
          <label htmlFor="facilityName" className="field-label">Facility Name</label>
          <input id="facilityName" name="facilityName" className="field-input" placeholder="Facility Name" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="licenseNumber" className="field-label">License number</label>
          <input id="licenseNumber" name="licenseNumber" className="field-input" placeholder="License number" />
        </div>
        <div>
          <label htmlFor="facilityNumber" className="field-label">No. facility</label>
          <input id="facilityNumber" name="facilityNumber" className="field-input" placeholder="No. facility" />
        </div>
      </div>

      <CustomerImageUpload inputName="imageUrl" onUploadingChange={setUploading} />

      <CustomerSubmitButton disabled={customerButtonDisabled} uploading={uploading} />
    </form>
  );
}
