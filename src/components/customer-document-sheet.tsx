import Image from "next/image";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { CustomerListItem } from "@/lib/data/customers";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

type Props = {
  customer: CustomerListItem;
};

type FieldItem = {
  label: string;
  value?: string | null;
};

function FieldCard({ label, value }: FieldItem) {
  return (
    <div className="doc-field">
      <div className="doc-label">{label}</div>
      <div className="doc-value">{value || "\u2014"}</div>
    </div>
  );
}

export function CustomerDocumentSheet({ customer }: Props) {
  const documentRows: Array<{
    right?: FieldItem;
    left?: FieldItem;
  }> = [
    {
      right: { label: "الأمانة", value: customer.honesty },
      left: { label: "البلدية", value: customer.municipal },
    },
    {
      right: { label: "الإسم", value: customer.name },
      left: { label: "رقم الهوية", value: customer.idNumber },
    },
    {
      right: { label: "الجنس", value: customer.sex },
      left: { label: "الجنسية", value: customer.nationality },
    },
    {
      right: { label: "رقم الشهادة الصحية", value: customer.healthCertNumber },
      left: { label: "المهنة", value: customer.occupation },
    },
    {
      right: {
        label: "تاريخ إصدار الشهادة الصحية هجري",
        value: customer.healthCertIssueHijri,
      },
      left: {
        label: "تاريخ إصدار الشهادة الصحية ميلادي",
        value: customer.healthCertIssueGregorian,
      },
    },
    {
      right: {
        label: "تاريخ نهاية الشهادة الصحية هجري",
        value: "",
      },
      left: {
        label: "تاريخ نهاية الشهادة الصحية ميلادي",
        value: customer.healthCertExpiry,
      },
    },
    {
      right: {
        label: "نوع البرنامج التثقيفي",
        value: customer.eduProgramType,
      },
      left: {
        label: "تاريخ انتهاء البرنامج التثقيفي",
        value: customer.eduProgramEnd || customer.eduProgramEndGregorian,
      },
    },
    {
      right: { label: "رقم الرخصة", value: customer.licenseNumber },
      left: { label: "إسم المنشأة", value: customer.facilityName },
    },
    {
      right: { label: "رقم المنشأة", value: customer.facilityNumber },
    },
  ];

  return (
    <>
      <style>{`
        .doc-root {
          direction: rtl;
          width: min(100%, 960px);
          margin: 0 auto;
          padding: 14px 18px 28px;
          border-top: 1px solid #d6dbe3;
          background: #ffffff;
          color: #2c3e50;
          font-family: ${ibmPlexSansArabic.style.fontFamily}, 'Segoe UI', Arial, sans-serif;
        }

        .doc-title {
          margin: 10px 0 18px;
          text-align: center;
          font-size: 34px;
          font-weight: 800;
          color: #334b63;
          line-height: 1.1;
        }

        .doc-photo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
        }

        .doc-photo {
          width: 138px;
          height: 138px;
          overflow: hidden;
          background: #d1d5db;
        }

        .doc-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .doc-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .doc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .doc-row-single {
          grid-template-columns: 1fr 1fr;
        }

        .doc-row-single .doc-spacer {
          visibility: hidden;
        }

        .doc-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .doc-label {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          text-align: right;
          line-height: 1.25;
        }

        .doc-value {
          min-height: 42px;
          border: 1px solid #b8c3d1;
          border-radius: 4px;
          background: #ffffff;
          padding: 9px 12px;
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          line-height: 1.35;
          word-break: break-word;
        }

        @media (max-width: 640px) {
          .doc-root {
            width: 100%;
            padding: 6px 12px 20px;
          }

          .doc-title {
            margin-top: 6px;
            margin-bottom: 16px;
            font-size: 30px;
          }

          .doc-photo {
            width: 160px;
            height: 160px;
          }

          .doc-grid {
            gap: 12px;
          }

          .doc-row,
          .doc-row-single {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .doc-row-single .doc-spacer {
            display: none;
          }

          .doc-label {
            font-size: 15px;
          }

          .doc-value {
            min-height: 44px;
            font-size: 15px;
          }
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
          }

          .doc-root {
            width: 100%;
            padding: 0;
            border-top: 0;
          }
        }
      `}</style>

      <article className={`${ibmPlexSansArabic.className} doc-root`}>
        <h1 className="doc-title">شهادة صحية</h1>

        <div className="doc-photo-wrap">
          <div className="doc-photo">
            <Image
              src={customer.imageUrl}
              alt={customer.name}
              width={160}
              height={160}
              priority
              sizes="(max-width: 640px) 160px, 138px"
            />
          </div>
        </div>

        <div className="doc-grid">
          {documentRows.map((row, index) => (
            <div
              key={`${row.right?.label || "row"}-${index}`}
              className={row.left ? "doc-row" : "doc-row doc-row-single"}
            >
              {row.right ? <FieldCard {...row.right} /> : <div className="doc-spacer" />}
              {row.left ? <FieldCard {...row.left} /> : <div className="doc-spacer" />}
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
