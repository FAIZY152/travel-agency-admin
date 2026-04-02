import Image from "next/image";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { CustomerDocumentSheet } from "@/components/customer-document-sheet";
import { getCustomerDocumentById } from "@/lib/data/customers";
import BaladyNavbar from "@/components/Navbar";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
});

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ServicesPage({ params }: PageProps) {
  const { id } = await params;
  const { customer } = await getCustomerDocumentById(id);

  if (!customer) {
    notFound();
  }

  return (
    <>
      <style>{`
        .balady-document-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          direction: rtl;
          background: #ffffff;
          color: #1f2937;
          font-family: ${ibmPlexSansArabic.style.fontFamily}, "Segoe UI", Arial, sans-serif;
        }

        .balady-document-shell {
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .balady-document-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .balady-document-content {
          flex: 1;
          padding: clamp(16px, 3vw, 28px) 16px 72px;
        }

        .balady-document-frame {
          width: min(100%, 1180px);
          margin: 0 auto;
        }

        .balady-page-footer {
          margin-top: auto;
          background: #045d39;
          color: #ffffff;
        }

        .balady-page-footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 32px;
          padding: 14px 28px 28px;
        }

        .balady-page-footer-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
          text-align: right;
          font-size: 14px;
          line-height: 1.8;
          font-weight: 700;
        }

        .balady-page-footer-links {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: flex-end;
          font-size: 13px;
        }

        .balady-page-footer-links a {
          color: inherit;
          text-decoration: none;
        }

        .balady-page-footer-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 10px;
          text-align: right;
          font-size: 13px;
          font-weight: 700;
        }

        .balady-page-footer-badge-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.94);
        }

        .balady-page-footer-badge-mark img {
          width: 68px;
          height: auto;
        }

        .balady-page-footer-brand-text {
          color: rgba(255, 255, 255, 0.72);
          font-size: 16px;
        }

        .balady-page-footer-copy p,
        .balady-page-footer-badge p {
          margin: 0;
        }

        @media (max-width: 1024px) {
          .balady-page-footer-inner {
            padding-inline: 20px;
          }
        }

        @media (max-width: 820px) {
          .balady-document-content {
            padding: 12px 0 0;
          }

          .balady-document-frame {
            width: 100%;
          }

          .balady-page-footer-inner {
            flex-direction: column;
            align-items: center;
            gap: 22px;
            padding: 12px 18px 26px;
          }

          .balady-page-footer-copy,
          .balady-page-footer-badge {
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .balady-page-footer-copy {
            gap: 14px;
            font-size: 13px;
          }

          .balady-page-footer-links {
            gap: 12px;
            font-size: 12px;
          }
        }

        @media print {
          .balady-page-footer {
            display: none !important;
          }

          .balady-document-main {
            min-height: 0;
          }

          .balady-document-content {
            padding: 0;
          }

          .balady-document-frame {
            width: 100%;
          }
        }
      `}</style>

      <div className={`${ibmPlexSansArabic.className} balady-document-page`}>
        <BaladyNavbar />
        <main className="balady-document-main">
          <div className="balady-document-content">
            <div className="balady-document-frame">
              <CustomerDocumentSheet customer={customer} />
            </div>
          </div>
        </main>
        <footer className="balady-page-footer">
          <div className="balady-document-shell balady-page-footer-inner">
            <div className="balady-page-footer-copy">
              <div className="balady-page-footer-links">
                <a href="#">خريطة الموقع</a>
                <a href="#">RSS</a>
                <a href="#">شروط الإستخدام</a>
              </div>
              <p>جميع الحقوق محفوظة لوزارة البلديات والإسكان © 2026</p>
              <p>تم تطويره وصيانته بواسطة وزارة البلديات والإسكان</p>
            </div>

            <div className="balady-page-footer-badge">
              <div className="balady-page-footer-badge-mark">
                <Image
                  src="/"
                  alt="Balady"
                  width={68}
                  height={30}
                />
                {/* <span className="balady-page-footer-brand-text">balady</span> */}
              </div>
              <p>مسجل لدى هيئة الحكومة الرقمية</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
