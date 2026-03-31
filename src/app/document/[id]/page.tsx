import Image from "next/image";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { CustomerDocumentSheet } from "@/components/customer-document-sheet";
import { getCustomerDocumentById } from "@/lib/data/customers";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
});

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-icon">
      <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 15l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-icon balady-icon-small">
      <path
        d="M12 8.4a3.6 3.6 0 1 0 0 7.2a3.6 3.6 0 0 0 0-7.2Zm8 3.6-.95-.55a7.9 7.9 0 0 0-.45-1.1l.37-1.03a1 1 0 0 0-.23-1.05l-1.1-1.1a1 1 0 0 0-1.05-.23l-1.03.37c-.35-.17-.72-.32-1.1-.45L14 3.9a1 1 0 0 0-.87-.5h-2.26a1 1 0 0 0-.87.5l-.55.95c-.38.13-.75.28-1.1.45l-1.03-.37a1 1 0 0 0-1.05.23l-1.1 1.1a1 1 0 0 0-.23 1.05l.37 1.03c-.17.35-.32.72-.45 1.1l-.95.55a1 1 0 0 0-.5.87v2.26a1 1 0 0 0 .5.87l.95.55c.13.38.28.75.45 1.1l-.37 1.03a1 1 0 0 0 .23 1.05l1.1 1.1a1 1 0 0 0 1.05.23l1.03-.37c.35.17.72.32 1.1.45l.55.95a1 1 0 0 0 .87.5h2.26a1 1 0 0 0 .87-.5l.55-.95c.38-.13.75-.28 1.1-.45l1.03.37a1 1 0 0 0 1.05-.23l1.1-1.1a1 1 0 0 0 .23-1.05l-.37-1.03c.17-.35.32-.72.45-1.1l.95-.55a1 1 0 0 0 .5-.87v-2.26a1 1 0 0 0-.5-.87Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccessIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-icon balady-icon-small">
      <circle cx="12" cy="4.8" r="1.9" fill="currentColor" />
      <path
        d="M12 7.3v4.2m0 0 3.8 2m-3.8-2-3.8 2M12 11.5l-2.4 7.2m2.4-7.2 2.4 7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-icon balady-icon-chevron">
      <path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-menu-icon">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;
  const { customer } = await getCustomerDocumentById(id);

  if (!customer) {
    notFound();
  }

  return (
    <>
      <style>{`
        .balady-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          direction: rtl;
          background: #ffffff;
          color: #1f2937;
          font-family: ${ibmPlexSansArabic.style.fontFamily}, "Segoe UI", Arial, sans-serif;
        }

        .balady-shell {
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .balady-gov-strip {
          border-top: 1px solid #1f2937;
          border-bottom: 1px solid #d8dde4;
          background: #ffffff;
        }

        .balady-gov-strip-inner {
          display: flex;
          min-height: 34px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 14px;
          font-size: 13px;
          line-height: 1;
        }

        .balady-gov-message,
        .balady-gov-tools,
        .balady-main-nav-group,
        .balady-main-nav-actions,
        .balady-brand-link,
        .balady-search-link,
        .balady-footer-links {
          display: flex;
          align-items: center;
        }

        .balady-gov-message,
        .balady-gov-tools {
          gap: 18px;
          font-weight: 700;
          color: #2f3b47;
        }

        .balady-gov-tools a,
        .balady-gov-message a,
        .balady-main-link,
        .balady-footer-links a {
          color: inherit;
          text-decoration: none;
        }

        .balady-tool-link,
        .balady-main-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .balady-gov-verify {
          color: #20845d;
        }

        .balady-gov-badge {
          display: inline-flex;
          height: 10px;
          width: 14px;
          border-radius: 2px;
          background: linear-gradient(180deg, #37a864 0%, #106642 100%);
        }

        .balady-main-nav {
          border-bottom: 1px solid #dfe4ea;
          background: #ffffff;
        }

        .balady-main-nav-desktop,
        .balady-main-nav-mobile {
          min-height: 58px;
          padding: 0 18px;
        }

        .balady-main-nav-desktop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .balady-main-nav-mobile {
          display: none;
          align-items: center;
          justify-content: space-between;
        }

        .balady-main-nav-group {
          gap: 22px;
        }

        .balady-main-nav-actions {
          gap: 18px;
        }

        .balady-brand-link {
          gap: 18px;
        }

        .balady-logo {
          display: block;
        }

        .balady-primary-nav {
          display: flex;
          align-items: stretch;
          gap: 2px;
        }

        .balady-main-link {
          height: 58px;
          padding: 0 16px;
          font-size: 14px;
          font-weight: 700;
          color: #2f3b47;
        }

        .balady-main-link-active {
          background: #14865c;
          color: #ffffff;
        }

        .balady-main-link-active svg {
          color: #d4f3e4;
        }

        .balady-icon {
          flex: none;
          height: 18px;
          width: 18px;
        }

        .balady-icon-small {
          height: 15px;
          width: 15px;
        }

        .balady-icon-chevron {
          height: 13px;
          width: 13px;
        }

        .balady-business-button,
        .balady-search-link,
        .balady-menu-button {
          display: inline-flex;
          align-items: center;
          border: 0;
          background: transparent;
          font: inherit;
          cursor: pointer;
        }

        .balady-business-button {
          gap: 8px;
          border-radius: 3px;
          background: #14865c;
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
        }

        .balady-search-link {
          gap: 4px;
          padding: 0;
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
        }

        .balady-business-arrow {
          font-size: 16px;
          line-height: 1;
        }

        .balady-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .balady-document-shell {
          flex: 1;
          padding: 16px 16px 80px;
        }

        .balady-document-frame {
          width: min(100%, 1180px);
          margin: 0 auto;
        }

        .balady-footer {
          margin-top: auto;
          background: #045d39;
          color: #ffffff;
        }

        .balady-footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 32px;
          padding: 14px 28px 28px;
        }

        .balady-footer-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
          text-align: right;
          font-size: 14px;
          line-height: 1.8;
          font-weight: 700;
        }

        .balady-footer-links {
          gap: 16px;
          justify-content: flex-end;
          font-size: 13px;
        }

        .balady-footer-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 10px;
          text-align: right;
          font-size: 13px;
          font-weight: 700;
        }

        .balady-footer-badge-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.94);
        }

        .balady-footer-badge-mark img {
          width: 68px;
          height: auto;
        }

        .balady-footer-brand-text {
          color: rgba(255, 255, 255, 0.72);
          font-size: 16px;
        }

        .balady-footer-copy p,
        .balady-footer-badge p {
          margin: 0;
        }

        @media (max-width: 1024px) {
          .balady-main-link {
            padding: 0 12px;
          }

          .balady-footer-inner {
            padding-inline: 20px;
          }
        }

        @media (max-width: 820px) {
          .balady-main-nav-desktop {
            display: none;
          }

          .balady-main-nav-mobile {
            display: flex;
            padding: 0 12px;
          }

          .balady-menu-button {
            justify-content: center;
            width: 38px;
            height: 38px;
            color: #4b5563;
          }

          .balady-menu-icon {
            width: 28px;
            height: 28px;
          }

          .balady-document-shell {
            padding: 6px 0 0;
          }

          .balady-document-frame {
            width: 100%;
          }

          .balady-footer-inner {
            flex-direction: column;
            align-items: center;
            gap: 22px;
            padding: 12px 18px 26px;
          }

          .balady-footer-copy,
          .balady-footer-badge {
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .balady-gov-strip-inner {
            min-height: 38px;
            gap: 8px;
            padding: 0 10px;
            font-size: 11px;
          }

          .balady-gov-message,
          .balady-gov-tools {
            gap: 10px;
          }

          .balady-main-nav-mobile {
            min-height: 54px;
          }

          .balady-footer-copy {
            gap: 14px;
            font-size: 13px;
          }

          .balady-footer-links {
            gap: 12px;
            font-size: 12px;
          }
        }

        @media print {
          .balady-gov-strip,
          .balady-main-nav,
          .balady-footer {
            display: none !important;
          }

          .balady-main {
            min-height: 0;
          }

          .balady-document-shell {
            padding: 0;
          }

          .balady-document-frame {
            width: 100%;
          }
        }
      `}</style>

      <div className={`${ibmPlexSansArabic.className} balady-page`}>
        <header>
          <div className="balady-gov-strip">
            <div className="balady-shell balady-gov-strip-inner">
              <div className="balady-gov-message">
                <span>موقع حكومي مسجل لدى هيئة الحكومة الرقمية</span>
                <a href="#" className="balady-gov-verify">
                  كيف تتحقق
                </a>
                <span className="balady-gov-badge" aria-hidden="true" />
              </div>

              <div className="balady-gov-tools">
                <a href="#" className="balady-tool-link">
                  <GearIcon />
                  <span>الإعدادات</span>
                </a>
                <a href="#" className="balady-tool-link">
                  <AccessIcon />
                  <span>أدوات سهولة الوصول</span>
                </a>
              </div>
            </div>
          </div>

          <div className="balady-main-nav">
            <div className="balady-shell balady-main-nav-desktop">
              <div className="balady-main-nav-group">
                <a href="#" className="balady-brand-link" aria-label="Balady">
                  <Image
                    src="/logo.svg"
                    alt="Balady"
                    width={112}
                    height={50}
                    priority
                    className="balady-logo"
                    style={{ width: "112px", height: "auto" }}
                  />
                </a>

                <nav className="balady-primary-nav" aria-label="Primary">
                  <a href="#" className="balady-main-link">
                    <span>عن بلدي</span>
                    <ChevronDownIcon />
                  </a>
                  <a href="#" className="balady-main-link balady-main-link-active">
                    <span>الخدمات</span>
                    <ChevronDownIcon />
                  </a>
                  <a href="#" className="balady-main-link">
                    <span>الاستعلامات</span>
                  </a>
                  <a href="#" className="balady-main-link">
                    <span>تواصل معنا</span>
                  </a>
                </nav>
              </div>

              <div className="balady-main-nav-actions">
                <button type="button" className="balady-business-button">
                  <span>بلدي أعمال</span>
                  <span className="balady-business-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>

                <button type="button" className="balady-search-link" aria-label="بحث">
                  <SearchIcon />
                  <span>بحث</span>
                </button>
              </div>
            </div>

            <div className="balady-shell balady-main-nav-mobile">
              <a href="#" className="balady-brand-link" aria-label="Balady">
                <Image
                  src="/logo.svg"
                  alt="Balady"
                  width={84}
                  height={38}
                  priority
                  className="balady-logo"
                  style={{ width: "84px", height: "auto" }}
                />
              </a>

              <button type="button" className="balady-menu-button" aria-label="فتح القائمة">
                <MenuIcon />
              </button>
            </div>
          </div>
        </header>

        <main className="balady-main">
          <div className="balady-document-shell">
            <div className="balady-document-frame">
              <CustomerDocumentSheet customer={customer} />
            </div>
          </div>
        </main>

        <footer className="balady-footer">
          <div className="balady-shell balady-footer-inner">
            <div className="balady-footer-copy">
              <div className="balady-footer-links">
                <a href="#">خريطة الموقع</a>
                <a href="#">RSS</a>
                <a href="#">شروط الإستخدام</a>
              </div>
              <p>جميع الحقوق محفوظة لوزارة البلديات والإسكان © 2026</p>
              <p>تم تطويره وصيانته بواسطة وزارة البلديات والإسكان</p>
            </div>

            <div className="balady-footer-badge">
              <div className="balady-footer-badge-mark">
                <Image
                  src="/logo.svg"
                  alt="Balady"
                  width={68}
                  height={30}
                  style={{ width: "68px", height: "auto" }}
                />
                <span className="balady-footer-brand-text">balady</span>
              </div>
              <p>مسجل لدى هيئة الحكومة الرقمية</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
