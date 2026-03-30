import Image from "next/image";
import { buildQrCodeImageUrl } from "@/lib/document";
import type { CustomerListItem } from "@/lib/data/customers";

type Props = {
  customer: CustomerListItem;
  verifyUrl: string;
  title: string;
  eyebrow: string;
};

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="field-row">
      <div className="field-label">{label}</div>
      <div className="field-value">{value || "—"}</div>
    </div>
  );
}

export function CustomerDocumentSheet({ customer, verifyUrl }: Props) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');

        .cert-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .cert-root {
          font-family: 'Cairo', 'Segoe UI', Arial, sans-serif;
          direction: rtl;
          width: 210mm;
          height: 297mm;
          margin: 0 auto;
          background: #fff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        /* ── HEADER ── */
        .cert-header {
          background: linear-gradient(135deg, #1a6b3a 0%, #2a8b52 55%, #35a865 100%);
          padding: 9px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .cert-header::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            45deg, transparent, transparent 16px,
            rgba(255,255,255,0.04) 16px, rgba(255,255,255,0.04) 32px
          );
        }
        .h-emblem, .h-seal {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.14);
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.28);
          display: flex; align-items: center; justify-content: center;
          font-size: 21px;
          flex-shrink: 0;
          position: relative; z-index: 1;
        }
        .h-center {
          flex: 1; text-align: center;
          position: relative; z-index: 1;
        }
        .h-country { font-size: 9.5px; font-weight: 700; color: rgba(255,255,255,0.78); letter-spacing: 0.06em; }
        .h-title   { font-size: 19px; font-weight: 900; color: #fff; line-height: 1.2; text-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        .h-sub     { font-size: 9px; color: rgba(255,255,255,0.62); font-weight: 500; letter-spacing: 0.05em; }

        /* ── BODY ── */
        .cert-body {
          flex: 1;
          padding: 9px 15px 7px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #f3f7f3;
          overflow: hidden;
        }

        /* ── TOP ROW ── */
        .cert-top {
          display: flex;
          gap: 11px;
          align-items: flex-start;
        }
        .photo-col {
          flex-shrink: 0;
          display: flex; flex-direction: column; align-items: center; gap: 3px;
        }
        .photo-frame {
          width: 82px; height: 100px;
          border-radius: 6px; overflow: hidden;
          border: 2.5px solid #2a8b52;
          box-shadow: 0 3px 10px rgba(42,139,82,0.2);
          background: #dceee4;
        }
        .photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .photo-lbl {
          font-size: 8px; font-weight: 700; color: #2a8b52;
          background: #e4f2ea; border: 1px solid #b8dcc8;
          border-radius: 10px; padding: 1px 7px;
        }
        .name-block { flex: 1; }
        .fullname {
          font-size: 14.5px; font-weight: 900; color: #163d22;
          padding-bottom: 5px; border-bottom: 1.5px solid #c2d9c6;
          margin-bottom: 6px; text-align: right;
        }
        .top-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }

        /* ── SECTION LABEL ── */
        .sec-lbl {
          display: flex; align-items: center; gap: 5px;
          font-size: 9px; font-weight: 800; color: #1e7a41; letter-spacing: 0.05em;
        }
        .sec-lbl::before {
          content: ''; width: 5px; height: 5px;
          border-radius: 50%; background: #2a8b52; flex-shrink: 0;
        }
        .sec-lbl::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, #b0d8bc, transparent);
        }

        /* ── FIELD ── */
        .field-row {
          background: #fff; border-radius: 4px;
          border: 1px solid #c8daca; overflow: hidden;
        }
        .field-label {
          background: linear-gradient(90deg, #e4f1e8, #f0f8f2);
          border-bottom: 1px solid #c8daca;
          padding: 2px 7px;
          font-size: 8.5px; font-weight: 800; color: #1a6b3a; text-align: right;
        }
        .field-value {
          padding: 3px 7px;
          font-size: 10.5px; font-weight: 600; color: #111; text-align: right;
          min-height: 20px;
        }

        /* ── GRIDS ── */
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; }
        .g4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 4px; }

        /* ── BOTTOM ROW: facility + QR ── */
        .bottom-row { display: flex; gap: 5px; align-items: stretch; }
        .facility-grid {
          flex: 1; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; align-content: start;
        }
        .qr-cell {
          width: 86px; flex-shrink: 0;
          background: #fff; border-radius: 4px;
          border: 1px solid #c8daca;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 5px 4px 4px; gap: 3px;
        }
        .qr-cell img { width: 68px; height: 68px; display: block; }
        .qr-lbl { font-size: 7.5px; font-weight: 700; color: #888; letter-spacing: 0.04em; }

        /* ── FOOTER ── */
        .cert-footer {
          background: linear-gradient(135deg, #1a6b3a 0%, #2a8b52 100%);
          padding: 6px 18px;
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0; position: relative; overflow: hidden;
        }
        .cert-footer::before {
          content: ''; position: absolute; inset: 0;
          background: repeating-linear-gradient(
            -45deg, transparent, transparent 12px,
            rgba(255,255,255,0.035) 12px, rgba(255,255,255,0.035) 24px
          );
        }
        .f-text { font-size: 8.5px; font-weight: 600; color: rgba(255,255,255,0.72); position: relative; z-index: 1; }
        .f-num  {
          font-size: 10.5px; font-weight: 900; color: #fff;
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.25);
          border-radius: 20px; padding: 2px 13px; letter-spacing: 0.05em;
          position: relative; z-index: 1;
        }

        /* ── PRINT ── */
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; }
          .cert-root {
            margin: 0; box-shadow: none; border-radius: 0;
            width: 210mm; height: 297mm;
            page-break-inside: avoid; break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cert-body { background: #f3f7f3 !important; }
        }
      `}</style>

      <article className="cert-root">

        {/* ══ HEADER ══ */}
        <header className="cert-header">
          <div className="h-emblem">🌴</div>
          <div className="h-center">
            <div className="h-country">المملكة العربية السعودية</div>
            <div className="h-title">الشهادة الصحية الموحدة</div>
            <div className="h-sub">Unified Health Certificate</div>
          </div>
          <div className="h-seal">⚕</div>
        </header>

        {/* ══ BODY ══ */}
        <div className="cert-body">

          {/* Photo + name + basics */}
          <div className="cert-top">
            <div className="photo-col">
              <div className="photo-frame">
                <Image src={customer.imageUrl} alt={customer.name} width={82} height={100} />
              </div>
              <span className="photo-lbl">صورة شخصية</span>
            </div>
            <div className="name-block">
              <div className="fullname">{customer.name}</div>
              <div className="top-grid">
                <Field label="الاسم" value={customer.name} />
                <Field label="رقم الهوية" value={customer.idNumber} />
                <Field label="الجنسية" value={customer.nationality} />
                <Field label="الجنس" value={customer.sex} />
              </div>
            </div>
          </div>

          {/* معلومات الجهة */}
          <div className="sec-lbl">معلومات الجهة</div>
          <div className="g4">
            <Field label="الامانة" value={customer.honesty} />
            <Field label="البلدية" value={customer.municipal} />
            <Field label="المهنة" value={customer.occupation} />
            <Field label="رقم الشهادة الصحية" value={customer.healthCertNumber} />
          </div>

          {/* تواريخ الشهادة الصحية */}
          <div className="sec-lbl">تواريخ الشهادة الصحية</div>
          <div className="g4">
            <Field label="إصدار — هجري" value={customer.healthCertIssueHijri} />
            <Field label="إصدار — ميلادي" value={customer.healthCertIssueGregorian} />
            <Field label="نهاية — هجري" value={customer.healthCertExpiryHijri} />
            <Field label="نهاية — ميلادي" value={customer.healthCertExpiryGregorian} />
          </div>

          {/* البرنامج التثقيفي */}
          <div className="sec-lbl">البرنامج التثقيفي</div>
          <div className="g2">
            <Field label="نوع البرنامج التثقيفي" value={customer.eduProgramType} />
            <Field label="تاريخ انتهاء البرنامج التثقيفي" value={customer.eduProgramEnd} />
          </div>

          {/* معلومات المنشأة + QR */}
          <div className="sec-lbl">معلومات المنشأة</div>
          <div className="bottom-row">
            <div className="facility-grid">
              <Field label="اسم المنشأة" value={customer.facilityName} />
              <Field label="رقم الرخصة" value={customer.licenseNumber} />
              <Field label="رقم المنشأة" value={customer.facilityNumber} />
            </div>
            <div className="qr-cell">
              <Image src={buildQrCodeImageUrl(verifyUrl)} alt="QR verification" width={68} height={68} />
              <span className="qr-lbl">امسح للتحقق</span>
            </div>
          </div>

        </div>

        {/* ══ FOOTER ══ */}
        <footer className="cert-footer">
          <span className="f-text">وزارة الصحة — المملكة العربية السعودية</span>
          <span className="f-num">{customer.healthCertNumber || "—"}</span>
        </footer>

      </article>
    </>
  );
}