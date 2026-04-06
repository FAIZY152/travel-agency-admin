"use client";

import { useState } from "react";
import { updateCustomerAction } from "@/app/dashboard/customers/actions";
import { CustomerImageUpload } from "@/components/customer-image-upload";
import { CustomerSubmitButton } from "@/components/customer-submit-button";
import {
  EMPTY_CUSTOMER_IMAGE_DATA_URL,
  type CustomerListItem,
} from "@/lib/customers/shared";

type Company = {
  id: string;
  name: string;
};

type Props = {
  companies: Company[];
  customer: CustomerListItem;
  returnTo: string;
};

function getInitialImageUrl(imageUrl: string) {
  return imageUrl === EMPTY_CUSTOMER_IMAGE_DATA_URL ? "" : imageUrl;
}

export function CustomerEditForm({ companies, customer, returnTo }: Props) {
  const [uploading, setUploading] = useState(false);

  return (
    <form action={updateCustomerAction} className="space-y-4">
      <input type="hidden" name="customerId" value={customer.id} />
      <input type="hidden" name="returnTo" value={returnTo} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-companyId" className="field-label">Company</label>
          <select
            id="e-companyId"
            name="companyId"
            defaultValue={customer.companyId || ""}
            className="field-input bg-white"
          >
            <option value="">Leave Empty</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="e-municipal" className="field-label">Municipal</label>
          <input
            id="e-municipal"
            name="municipal"
            defaultValue={customer.municipal || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-honesty" className="field-label">Honesty</label>
          <input
            id="e-honesty"
            name="honesty"
            defaultValue={customer.honesty || ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-idNumber" className="field-label">ID Number</label>
          <input
            id="e-idNumber"
            name="idNumber"
            defaultValue={customer.idNumber || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-name" className="field-label">Name</label>
          <input
            id="e-name"
            name="name"
            defaultValue={customer.name}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-nationality" className="field-label">Nationality</label>
          <input
            id="e-nationality"
            name="nationality"
            defaultValue={customer.nationality || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-sex" className="field-label">Sex</label>
          <input
            id="e-sex"
            name="sex"
            defaultValue={customer.sex || ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-occupation" className="field-label">Occupation</label>
          <input
            id="e-occupation"
            name="occupation"
            defaultValue={customer.occupation || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-healthCertNumber" className="field-label">
            Health certificate number
          </label>
          <input
            id="e-healthCertNumber"
            name="healthCertNumber"
            defaultValue={customer.healthCertNumber || ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-healthCertExpiryHijri" className="field-label">
            Health certificate expiry date (Hijri)
          </label>
          <input
            id="e-healthCertExpiryHijri"
            name="healthCertExpiryHijri"
            defaultValue={customer.healthCertExpiryHijri || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-healthCertExpiry" className="field-label">
            Health certificate expiry date (Gregorian)
          </label>
          <input
            id="e-healthCertExpiry"
            name="healthCertExpiry"
            defaultValue={customer.healthCertExpiry || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-healthCertIssueHijri" className="field-label">
            Health certificate issue date (Hijri)
          </label>
          <input
            id="e-healthCertIssueHijri"
            name="healthCertIssueHijri"
            defaultValue={customer.healthCertIssueHijri || ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-healthCertIssueGregorian" className="field-label">
            Health certificate issue date (Gregorian)
          </label>
          <input
            id="e-healthCertIssueGregorian"
            name="healthCertIssueGregorian"
            defaultValue={customer.healthCertIssueGregorian || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-eduProgramEnd" className="field-label">
            Educational program end date (Hijri)
          </label>
          <input
            id="e-eduProgramEnd"
            name="eduProgramEnd"
            defaultValue={customer.eduProgramEnd || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-eduProgramType" className="field-label">
            Type of educational program
          </label>
          <input
            id="e-eduProgramType"
            name="eduProgramType"
            defaultValue={customer.eduProgramType || ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-facilityName" className="field-label">Facility Name</label>
          <input
            id="e-facilityName"
            name="facilityName"
            defaultValue={customer.facilityName || ""}
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-licenseNumber" className="field-label">License number</label>
          <input
            id="e-licenseNumber"
            name="licenseNumber"
            defaultValue={customer.licenseNumber || ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="e-facilityNumber" className="field-label">No. facility</label>
          <input
            id="e-facilityNumber"
            name="facilityNumber"
            defaultValue={customer.facilityNumber || ""}
            className="field-input"
          />
        </div>
      </div>

      <CustomerImageUpload
        inputName="imageUrl"
        initialImageUrl={getInitialImageUrl(customer.imageUrl)}
        onUploadingChange={setUploading}
      />

      <CustomerSubmitButton
        disabled={uploading}
        uploading={uploading}
        idleLabel="Update Customer"
        pendingLabel="Updating Customer..."
        className="primary-button w-full sm:w-auto cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      />
    </form>
  );
}
