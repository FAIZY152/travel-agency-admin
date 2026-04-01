"use client";

import Image from "next/image";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BALADY_BRAND_LINK,
  BALADY_BUSINESS_LINK,
  BALADY_NAV_ITEMS,
  BALADY_SEARCH_LINK,
  BALADY_TOP_TOOLS,
  BALADY_VERIFY_BADGE,
  BALADY_VERIFY_CARDS,
  BALADY_VERIFY_LINK,
  type BaladyLink,
  type BaladyNavItem,
  type BaladyTopTool,
  type BaladyVerifyCard,
} from "@/lib/balady-navigation";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
});

const DEFAULT_MOBILE_EXPANDED =
  BALADY_NAV_ITEMS.find((item) => item.active && item.panel)?.id ??
  BALADY_NAV_ITEMS.find((item) => item.panel)?.id ??
  null;

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

function LinkCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-verify-icon">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 13.6 8.1 15a2.4 2.4 0 1 0 3.4 3.4l1.9-1.9m1.1-6.1 1.4-1.4A2.4 2.4 0 1 0 12.5 5.6l-1.9 1.9m-1.3 6 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-verify-icon">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.3 11V9.6a2.7 2.7 0 1 1 5.4 0V11m-5.8 0h6.2v5.2H8.9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DigitalBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-digital-badge-icon">
      <path d="M12 3 7 5.8v5.5c0 4.1 2.3 7.8 5 9.7 2.7-1.9 5-5.6 5-9.7V5.8L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.4 11.6h5.2M9.4 8.8h5.2M9.4 14.4h3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-inline-icon">
      <path d="M14 5h5v5m-1.4-3.6L9 15m7 4H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function getAnchorProps(href: string) {
  if (!isExternalHref(href)) {
    return {};
  }

  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}

function renderTopToolIcon(tool: BaladyTopTool) {
  if (tool.icon === "gear") {
    return <GearIcon />;
  }

  return <AccessIcon />;
}

function renderVerifyIcon(card: BaladyVerifyCard) {
  if (card.icon === "lock") {
    return <LockCircleIcon />;
  }

  return <LinkCircleIcon />;
}

function renderLinkArrow() {
  return (
    <span className="balady-business-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function NavAnchor({
  link,
  className,
  children,
}: {
  link: BaladyLink;
  className: string;
  children?: ReactNode;
}) {
  return (
    <a href={link.href} className={className} {...getAnchorProps(link.href)}>
      {children ?? <span>{link.label}</span>}
    </a>
  );
}

function DesktopNavItem({
  item,
  isOpen,
  onToggle,
}: {
  item: BaladyNavItem;
  isOpen: boolean;
  onToggle: (itemId: string) => void;
}) {
  const panelId = `desktop-panel-${item.id}`;

  if (!item.panel) {
    return (
      <div className="balady-nav-item">
        <a
          href={item.href ?? "#"}
          className={`balady-main-link ${item.active ? "balady-main-link-active" : ""}`}
          aria-current={item.active ? "page" : undefined}
          {...getAnchorProps(item.href ?? "#")}
        >
          <span>{item.label}</span>
        </a>
      </div>
    );
  }

  return (
    <div className={`balady-nav-item ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className={`balady-main-link ${item.active ? "balady-main-link-active" : ""}`}
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{item.label}</span>
        <ChevronDownIcon />
      </button>

      <div id={panelId} className="balady-dropdown" role="group">
        <div
          className={`balady-dropdown-grid ${
            item.panel.layout === "list" ? "balady-dropdown-grid-list" : ""
          }`}
        >
          {item.panel.sections.map((section) => (
            <div key={section.id} className="balady-dropdown-section">
              {section.title ? <div className="balady-dropdown-title">{section.title}</div> : null}
              {section.links.map((link) => (
                <a key={link.label} href={link.href} className="balady-dropdown-link" {...getAnchorProps(link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {item.panel.cta || item.panel.highlightLink ? (
          <div className="balady-dropdown-footer">
            {item.panel.cta ? (
              <NavAnchor link={item.panel.cta} className="balady-dropdown-cta">
                <span>{item.panel.cta.label}</span>
                <ChevronDownIcon />
              </NavAnchor>
            ) : (
              <span />
            )}

            {item.panel.highlightLink ? (
              <a
                href={item.panel.highlightLink.href}
                className="balady-dropdown-highlight"
                {...getAnchorProps(item.panel.highlightLink.href)}
              >
                {item.panel.highlightLink.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function BaladyNavbar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(DEFAULT_MOBILE_EXPANDED);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const updateHeight = () => {
      setNavHeight(Math.ceil(root.getBoundingClientRect().height));
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(root);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const resetOverlayState = () => {
      setOpenDropdown(null);
      setVerifyOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        resetOverlayState();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetOverlayState();
      }
    };

    const handlePageShow = () => {
      resetOverlayState();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetOverlayState();
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 820px)");

    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setMobileMenuOpen(true);
        setMobileExpanded((current) => current ?? DEFAULT_MOBILE_EXPANDED);
        return;
      }

      setOpenDropdown(null);
      setVerifyOpen(false);
    };

    handleViewportChange(media);
    media.addEventListener("change", handleViewportChange);

    return () => {
      media.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const toggleVerifyPanel = () => {
    setOpenDropdown(null);
    setVerifyOpen((current) => !current);
  };

  const toggleDesktopDropdown = (itemId: string) => {
    setVerifyOpen(false);
    setOpenDropdown((current) => (current === itemId ? null : itemId));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => !current);
  };

  const toggleMobileSection = (itemId: string) => {
    setMobileExpanded((current) => (current === itemId ? null : itemId));
  };

  return (
    <>
      <div className="balady-nav-spacer" aria-hidden="true" style={{ height: `${navHeight}px` }} />

      <div ref={rootRef} className={`${ibmPlexSansArabic.className} balady-nav-root`}>
      <header ref={headerRef} className={`balady-header ${scrolled ? "scrolled" : ""}`}>
        <div className="balady-gov-strip">
          <div className="balady-nav-shell balady-gov-strip-inner">
            <div className="balady-gov-message">
              <span className="balady-gov-message-text">موقع حكومي مسجل لدى هيئة الحكومة الرقمية</span>

              <button
                type="button"
                className={`balady-gov-verify balady-gov-verify-desktop ${verifyOpen ? "active" : ""}`}
                onClick={toggleVerifyPanel}
                aria-expanded={verifyOpen}
                aria-controls="balady-verify-panel"
              >
                <span>كيف تتحقق</span>
                <ChevronDownIcon />
              </button>

              <span className="balady-gov-badge" aria-hidden="true" />
            </div>

            <button
              type="button"
              className={`balady-mobile-verify-toggle ${verifyOpen ? "active" : ""}`}
              onClick={toggleVerifyPanel}
              aria-expanded={verifyOpen}
              aria-controls="balady-verify-panel"
            >
              <span>كيف تتحقق</span>
              <ChevronDownIcon />
            </button>

            <div className="balady-gov-tools">
              {BALADY_TOP_TOOLS.map((tool) => (
                <a key={tool.id} href={tool.href} className="balady-tool-link" {...getAnchorProps(tool.href)}>
                  {renderTopToolIcon(tool)}
                  <span>{tool.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {verifyOpen ? (
          <div id="balady-verify-panel" className="balady-verify-panel open">
            <div className="balady-nav-shell balady-verify-content">
              <div className="balady-verify-list">
                {BALADY_VERIFY_CARDS.map((card) => (
                  <div key={card.id} className="balady-verify-item">
                    <div className="balady-verify-card-visual">{renderVerifyIcon(card)}</div>
                    <div className="balady-verify-card-copy">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="balady-verify-badge">
                <span>{BALADY_VERIFY_BADGE.label}</span>
                <a href={BALADY_VERIFY_LINK} className="balady-verify-code" {...getAnchorProps(BALADY_VERIFY_LINK)}>
                  <ExternalLinkIcon />
                  <span>{BALADY_VERIFY_BADGE.value}</span>
                </a>
                <div className="balady-verify-badge-mark">
                  <DigitalBadgeIcon />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="balady-main-nav">
          <div className="balady-nav-shell balady-main-nav-desktop">
            <div className="balady-main-nav-group">
              <a href={BALADY_BRAND_LINK} className="balady-brand-link" aria-label="Balady" {...getAnchorProps(BALADY_BRAND_LINK)}>
                <Image src="/logo.svg" alt="Balady" width={112} height={50} priority className="balady-logo" />
              </a>

              <nav className="balady-primary-nav" aria-label="Primary">
                {BALADY_NAV_ITEMS.map((item) => (
                  <DesktopNavItem
                    key={item.id}
                    item={item}
                    isOpen={openDropdown === item.id}
                    onToggle={toggleDesktopDropdown}
                  />
                ))}
              </nav>
            </div>

            <div className="balady-main-nav-actions">
              <a href={BALADY_BUSINESS_LINK.href} className="balady-business-button" {...getAnchorProps(BALADY_BUSINESS_LINK.href)}>
                <span>{BALADY_BUSINESS_LINK.label}</span>
                {renderLinkArrow()}
              </a>

              <a href={BALADY_SEARCH_LINK} className="balady-search-link" aria-label="بحث" {...getAnchorProps(BALADY_SEARCH_LINK)}>
                <SearchIcon />
                <span>بحث</span>
              </a>
            </div>
          </div>

          <div className="balady-nav-shell balady-main-nav-mobile">
            <div className="balady-mobile-brand-row">
              <a href={BALADY_BRAND_LINK} className="balady-mobile-brand-link" aria-label="Balady" {...getAnchorProps(BALADY_BRAND_LINK)}>
                <Image src="/logo.svg" alt="Balady" width={112} height={50} priority className="balady-logo" />
              </a>

              <button
                type="button"
                className="balady-menu-button balady-mobile-brand-menu"
                aria-label="فتح القائمة"
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        <div className={`balady-mobile-sections ${mobileMenuOpen ? "open" : ""}`}>
          <div className="balady-mobile-sections-inner">
            {BALADY_NAV_ITEMS.map((item) => {
              const isExpanded = mobileExpanded === item.id;
              const isActive = Boolean(item.active);

              if (!item.panel) {
                return (
                  <a
                    key={item.id}
                    href={item.href ?? "#"}
                    className="balady-mobile-link-block"
                    {...getAnchorProps(item.href ?? "#")}
                  >
                    <span className="balady-mobile-link-label">{item.label}</span>
                  </a>
                );
              }

              return (
                <section
                  key={item.id}
                  className={`balady-mobile-section ${isExpanded ? "open" : ""} ${
                    isActive ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`balady-mobile-section-trigger ${isExpanded ? "open" : ""} ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() => toggleMobileSection(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-panel-${item.id}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon />
                  </button>

                  <div
                    id={`mobile-panel-${item.id}`}
                    className={`balady-mobile-section-panel ${isExpanded ? "open" : ""}`}
                  >
                    {item.panel.layout === "grid" ? (
                      <div className="balady-mobile-services-grid">
                        {item.panel.sections.map((section) => (
                          <div key={section.id} className="balady-mobile-service-column">
                            {section.title ? <h3>{section.title}</h3> : null}
                            {section.links.map((link) => (
                              <a key={link.label} href={link.href} className="balady-mobile-service-link" {...getAnchorProps(link.href)}>
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="balady-mobile-links-list">
                        {item.panel.sections.flatMap((section) =>
                          section.links.map((link) => (
                            <a key={link.label} href={link.href} className="balady-mobile-list-link" {...getAnchorProps(link.href)}>
                              {link.label}
                            </a>
                          )),
                        )}
                      </div>
                    )}

                    {item.panel.cta || item.panel.highlightLink ? (
                      <div className="balady-mobile-panel-footer">
                        {item.panel.cta ? (
                          <a href={item.panel.cta.href} className="balady-mobile-panel-cta" {...getAnchorProps(item.panel.cta.href)}>
                            <span>{item.panel.cta.label}</span>
                            <ChevronDownIcon />
                          </a>
                        ) : null}

                        {item.panel.highlightLink ? (
                          <a
                            href={item.panel.highlightLink.href}
                            className="balady-mobile-panel-highlight"
                            {...getAnchorProps(item.panel.highlightLink.href)}
                          >
                            {item.panel.highlightLink.label}
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}

            <a href={BALADY_BUSINESS_LINK.href} className="balady-mobile-business-button" {...getAnchorProps(BALADY_BUSINESS_LINK.href)}>
              <span>{BALADY_BUSINESS_LINK.label}</span>
              {renderLinkArrow()}
            </a>

            <a href={BALADY_SEARCH_LINK} className="balady-mobile-search-link" aria-label="بحث" {...getAnchorProps(BALADY_SEARCH_LINK)}>
              <SearchIcon />
              <span>بحث</span>
            </a>
          </div>
        </div>
      </header>
      </div>
    </>
  );
}
