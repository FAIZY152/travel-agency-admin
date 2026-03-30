"use client";

import { useState } from "react";
import { CustomerImageUpload } from "@/components/customer-image-upload";
import { createCustomerAction } from "@/app/dashboard/customers/actions";

type Company = { id: string; name: string };

export function AddCustomerForm({ companies }: { companies: Company[] }) {
  const [uploading, setUploading] = useState(false);

  return (
    <form action={createCustomerAction} className="space-y-4">

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="companyId" className="field-label">Company</label>
          <select id="companyId" name="companyId" required className="field-input bg-white">
            <option value="">Select Company</option>
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
          <label htmlFor="honesty" className="field-label">honesty</label>
          <input id="honesty" name="honesty" className="field-input" placeholder="honesty" />
        </div>
        <div>
          <label htmlFor="idNumber" className="field-label">ID Number</label>
          <input id="idNumber" name="idNumber" className="field-input" placeholder="Enter ID Number" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">The Name</label>
          <input id="name" name="name" required className="field-input" placeholder="Enter Customer Name" />
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
          <label htmlFor="healthCertExpiry" className="field-label">Health certificate expiration date</label>
          <input id="healthCertExpiry" name="healthCertExpiry" className="field-input" placeholder="Health certificate expiration date" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="healthCertIssueHijri" className="field-label">Date of issuance of the health certificate</label>
          <input id="healthCertIssueHijri" name="healthCertIssueHijri" className="field-input" placeholder="Date of issuance of the health certificate" />
        </div>
        <div>
          <label htmlFor="healthCertIssueGregorian" className="field-label">Date of issuance of the health certificate Gregorian</label>
          <input id="healthCertIssueGregorian" name="healthCertIssueGregorian" className="field-input" placeholder="Date of issuance of the health certificate" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="eduProgramEnd" className="field-label">End date of the educational program</label>
          <input id="eduProgramEnd" name="eduProgramEnd" className="field-input" placeholder="End date of the educational program" />
        </div>
        <div>
          <label htmlFor="eduProgramEndGregorian" className="field-label">End date of the educational program Gregorian</label>
          <input id="eduProgramEndGregorian" name="eduProgramEndGregorian" className="field-input" placeholder="End date of the educational program Gregorian" />
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
          <label htmlFor="licenseNumber" className="field-label">license number</label>
          <input id="licenseNumber" name="licenseNumber" className="field-input" placeholder="license number" />
        </div>
        <div>
          <label htmlFor="facilityNumber" className="field-label">No. facility</label>
          <input id="facilityNumber" name="facilityNumber" className="field-input" placeholder="No. facility" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="healthCertExpiryHijri" className="field-label">Health cert expiry (Hijri)</label>
          <input id="healthCertExpiryHijri" name="healthCertExpiryHijri" className="field-input" placeholder="e.g. 1448/01/07" />
        </div>
        <div>
          <label htmlFor="healthCertExpiryGregorian" className="field-label">Health cert expiry (Gregorian)</label>
          <input id="healthCertExpiryGregorian" name="healthCertExpiryGregorian" className="field-input" placeholder="e.g. 2026/06/22" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="issueDate" className="field-label">Issue Date</label>
          <input id="issueDate" name="issueDate" type="date" required className="field-input" />
        </div>
        <div>
          <label htmlFor="expiryDate" className="field-label">Expiry Date</label>
          <input id="expiryDate" name="expiryDate" type="date" required className="field-input" />
        </div>
      </div>

      <CustomerImageUpload inputName="imageUrl" onUploadingChange={setUploading} />

      <button
        type="submit"
        disabled={companies.length === 0 || uploading}
        className="primary-button w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading ? "Uploading image..." : "Save Customer"}
      </button>
    </form>
  );
}
