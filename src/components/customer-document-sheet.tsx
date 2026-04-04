import Image from "next/image";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";
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

const DOCUMENT_PHOTO_SIZE = 200;
const DOCUMENT_PHOTO_SIZE_MOBILE = 168;
const EMPTY_IMAGE_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function FieldCard({ label, value }: FieldItem) {
  return (
    <div className="doc-field">
      <div className="doc-label">{label}</div>
      <div className="doc-value">{value || ""}</div>
    </div>
  );
}

export function CustomerDocumentSheet({ customer }: Props) {
  const hasCustomerImage =
    Boolean(customer.imageUrl) && customer.imageUrl !== EMPTY_IMAGE_DATA_URL;
  const documentImageUrl = hasCustomerImage
    ? buildCloudinaryImageUrl(customer.imageUrl, {
        width: DOCUMENT_PHOTO_SIZE,
        height: DOCUMENT_PHOTO_SIZE,
        crop: "fill",
        gravity: "auto",
      })
    : "";
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
        value: customer.eduProgramEnd,
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
          width: min(100%, 1100px);
          margin: 0 auto;
          padding: 20px 28px 48px;
          background: #ffffff;
          color: #334155;
          font-family: ${ibmPlexSansArabic.style.fontFamily}, 'Segoe UI', Arial, sans-serif;
          font-weight: 700;
        }

        .doc-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
        }

        .doc-title {
          margin: 0;
          text-align: center;
          font-size: clamp(40px, 4.5vw, 54px);
          font-weight: 700;
          color: #55657b;
          line-height: 1.12;
        }

        .doc-photo-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .doc-photo {
          width: ${DOCUMENT_PHOTO_SIZE}px;
          height: ${DOCUMENT_PHOTO_SIZE}px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #eef2f6;
        }

        .doc-photo-frame {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #eef2f6;
        }

        .doc-photo img,
        .doc-photo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .doc-photo-placeholder {
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 18px;
          background: #eef2f6;
        }

        .doc-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
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
          gap: 8px;
        }

        .doc-label {
          font-size: 15px;
          font-weight: 700;
          color: #4d5b68;
          text-align: right;
          line-height: 1.35;
        }

        .doc-value {
          min-height: 46px;
          border: 1px solid #c6d1db;
          border-radius: 2px;
          background: #fcfeff;
          padding: 10px 14px;
          font-size: 15px;
          font-weight: 700;
          color: #6b7785;
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
            padding: 14px 12px 24px;
          }

          .doc-header {
            gap: 14px;
            margin-bottom: 22px;
          }

          .doc-title {
            font-size: 28px;
          }

          .doc-photo {
            width: ${DOCUMENT_PHOTO_SIZE_MOBILE}px;
            height: ${DOCUMENT_PHOTO_SIZE_MOBILE}px;
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
          }
        }
      `}</style>

      <article className={`${ibmPlexSansArabic.className} doc-root`}>
        <div className="doc-header">
          <h1 className="doc-title">شهادة صحية</h1>

          <div className="doc-photo-wrap">
            <div className="doc-photo">
              <div className="doc-photo-frame">
                {hasCustomerImage ? (
                  <Image
                    src={documentImageUrl}
                    alt={customer.name}
                    width={DOCUMENT_PHOTO_SIZE}
                    height={DOCUMENT_PHOTO_SIZE}
                    priority
                    sizes={`(max-width: 640px) ${DOCUMENT_PHOTO_SIZE_MOBILE}px, ${DOCUMENT_PHOTO_SIZE}px`}
                    className="doc-photo-image"
                  />
                ) : (
                  <div className="doc-photo-placeholder">الصورة</div>
                )}
              </div>
            </div>
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
