import Image from "next/image";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { CustomerListItem } from "@/lib/data/customers";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
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
      <div className="doc-value">{value || ""}</div>
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
        value: customer.healthCertExpiryHijri,
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
          width: min(100%, 1128px);
          margin: 0 auto;
          padding: 28px 26px 48px;
          border-top: 1px solid #dfe4ea;
          background: #ffffff;
          color: #334155;
          font-family: ${ibmPlexSansArabic.style.fontFamily}, 'Segoe UI', Arial, sans-serif;
          font-weight: 700;
        }

        .doc-title {
          margin: 8px 0 22px;
          text-align: center;
          font-size: 48px;
          font-weight: 700;
          color: #5f6c77;
          line-height: 1.15;
        }

        .doc-photo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .doc-photo {
          width: 158px;
          height: 158px;
          overflow: hidden;
          background: #d6dbe2;
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
          gap: 12px;
        }

        .doc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
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
          gap: 7px;
        }

        .doc-label {
          font-size: 16px;
          font-weight: 700;
          color: #334155;
          text-align: right;
          line-height: 1.35;
        }

        .doc-value {
          min-height: 43px;
          border: 1px solid #c5ced8;
          border-radius: 2px;
          background: #fdfefe;
          padding: 8px 12px;
          font-size: 15px;
          font-weight: 700;
          color: #7b8794;
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
            padding: 10px 12px 20px;
          }

          .doc-title {
            margin-top: 8px;
            margin-bottom: 16px;
            font-size: 33px;
          }

          .doc-photo {
            width: 128px;
            height: 128px;
          }

          .doc-grid {
            gap: 14px;
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
            font-size: 14px;
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
              sizes="(max-width: 640px) 128px, 158px"
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
