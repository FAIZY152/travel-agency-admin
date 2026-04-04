  "use client";

  import Image from "next/image";
  import { IBM_Plex_Sans_Arabic } from "next/font/google";
  import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
  import { BiSolidBellOff } from "react-icons/bi";
  import { BsBookmarkPlusFill } from "react-icons/bs";
  import { FaCalendarDays } from "react-icons/fa6";
  import { FiMenu } from "react-icons/fi";
  import { GoChevronDown, GoGear } from "react-icons/go";
  import { PiPersonLight } from "react-icons/pi";
  import { MdOutlineBookmarkAdd } from "react-icons/md";

  import {
    LuExternalLink,
    LuLink2,
    LuLockKeyhole,
    LuPrinter,
    LuSearch,
  } from "react-icons/lu";
  import {
    BALADY_BRAND_LINK,
    BALADY_BUSINESS_LINK,
    BALADY_NAV_ITEMS,
    BALADY_SETTINGS_MENU,
    BALADY_SEARCH_LINK,
    BALADY_TOP_TOOLS,
    BALADY_VERIFY_BADGE,
    BALADY_VERIFY_CARDS,
    BALADY_VERIFY_LINK,
    type BaladyLink,
    type BaladyNavItem,
    type BaladySettingsItem,
    type BaladyTopTool,
    type BaladyVerifyCard,
  } from "@/lib/balady-navigation";

  const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
    subsets: ["arabic"],
    weight: ["700"],
  });

  
  function SearchIcon() {
    return <LuSearch aria-hidden="true" className="balady-icon" strokeWidth={2} />;
  }

  function GearIcon() {
    return <GoGear aria-hidden="true" className="balady-icon balady-icon-small balady-icon-gear" />;
  }

  function AccessIcon() {
    return <PiPersonLight aria-hidden="true" className="balady-icon balady-icon-access" />;
  }

  function ChevronDownIcon() {
    return <GoChevronDown aria-hidden="true" className="balady-icon balady-icon-chevron" />;
  }

  function MenuIcon() {
    return <FiMenu aria-hidden="true" className="balady-menu-icon" />;
  }

  function PrintIcon() {
    return <LuPrinter aria-hidden="true" className="balady-settings-icon balady-settings-icon-print" strokeWidth={1.9} />;
  }

  function BookmarkIcon() {
    return <MdOutlineBookmarkAdd aria-hidden="true" className="balady-settings-icon balady-settings-icon-bookmark" />;
  }

  function NotificationsIcon() {
    return <BiSolidBellOff aria-hidden="true" className="balady-settings-icon balady-settings-icon-notifications" />;
  }

  function CalendarIcon() {
    return <FaCalendarDays aria-hidden="true" className="balady-settings-icon balady-settings-icon-calendar" />;
  }

  function LinkCircleIcon() {
    return <LuLink2 aria-hidden="true" className="balady-verify-icon" strokeWidth={1.9} />;
  }

  function LockCircleIcon() {
    return <LuLockKeyhole aria-hidden="true" className="balady-verify-icon" strokeWidth={1.9} />;
  }

  function DigitalBadgeIcon() {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="balady-digital-badge-icon">
        <path d="M8.2 5.2v7.6l3.8 3.8" fill="none" stroke="#17b3c1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.8 5.2v7.6L12 16.6" fill="none" stroke="#6c4fd3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.4 8.1 11 3.5m6.6 4.6L13 3.5M6.4 15.9l4.6 4.6m6.6-4.6L13 20.5" fill="none" stroke="#17b3c1" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9.4 9.2h5.2m-5.2 3h5.2" fill="none" stroke="#6c4fd3" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  function ExternalLinkIcon() {
    return <LuExternalLink aria-hidden="true" className="balady-inline-icon" strokeWidth={2} />;
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

  function renderSettingsIcon(item: BaladySettingsItem) {
    if (item.icon === "print") {
      return <PrintIcon />;
    }

    if (item.icon === "bookmark") {
      return <BookmarkIcon />;
    }

    if (item.icon === "notifications") {
      return <NotificationsIcon />;
    }

    return <CalendarIcon />;
  }

  function renderVerifyIcon(card: BaladyVerifyCard) {
    if (card.icon === "lock") {
      return <LockCircleIcon />;
    }

    return <LinkCircleIcon />;
  }

  function renderVerifyTitle(card: BaladyVerifyCard) {
    if (card.id === "gov-domain") {
      return (
        <>
          روابط المواقع الإلكترونية الرسمية السعودية
          <br />
          تنتهي بـ <span className="balady-verify-highlight">gov.sa</span>
        </>
      );
    }

    return (
      <>
        المواقع الإلكترونية الحكومية تستخدم
        <br />
        بروتوكول <span className="balady-verify-highlight">HTTPS</span> للتشفير و الأمان.
      </>
    );
  }

  function renderVerifyDescription(card: BaladyVerifyCard) {
    if (card.id === "gov-domain") {
      return (
        <>
          جميع روابط المواقع الرسمية التابعة للجهات الحكومية في المملكة
          <br />
          العربية السعودية تنتهي بـ <span className="balady-verify-highlight">gov.sa</span>
        </>
      );
    }

    return (
      <>
        المواقع الإلكترونية الآمنة في المملكة العربية السعودية تستخدم
        <br />
        بروتوكول <span className="balady-verify-highlight">HTTPS</span> المشفر.
      </>
    );
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [verifyOpen, setVerifyOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const [dateMode, setDateMode] = useState<"gregorian" | "hijri">(() => {
      if (typeof window === "undefined") {
        return "gregorian";
      }

      const savedDateMode = window.localStorage.getItem("balady-date-mode");
      return savedDateMode === "gregorian" || savedDateMode === "hijri" ? savedDateMode : "gregorian";
    });

    useEffect(() => {
      document.documentElement.dataset.baladyDateMode = dateMode;
    }, [dateMode]);

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
        setSettingsOpen(false);
      };

      const handleScroll = () => {
        const isScrolled = window.scrollY > 10;
        setScrolled(isScrolled);

        if (isScrolled && window.matchMedia("(max-width: 820px)").matches) {
          setVerifyOpen(false);
          setSettingsOpen(false);
        }
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
          setMobileMenuOpen(false);
          setMobileExpanded(null);
          return;
        }

        setMobileMenuOpen(false);
        setMobileExpanded(null);
        setOpenDropdown(null);
        setVerifyOpen(false);
        setSettingsOpen(false);
      };

      handleViewportChange(media);
      media.addEventListener("change", handleViewportChange);

      return () => {
        media.removeEventListener("change", handleViewportChange);
      };
    }, []);

    const toggleVerifyPanel = () => {
      setOpenDropdown(null);
      setSettingsOpen(false);
      setVerifyOpen((current) => !current);
    };

    const toggleDesktopDropdown = (itemId: string) => {
      setVerifyOpen(false);
      setSettingsOpen(false);
      setOpenDropdown((current) => (current === itemId ? null : itemId));
    };

    const toggleSettingsMenu = () => {
      setOpenDropdown(null);
      setVerifyOpen(false);
      setSettingsOpen((current) => !current);
    };

    const handleSavePage = () => {
      const blob = new Blob([document.documentElement.outerHTML], {
        type: "text/html;charset=utf-8",
      });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "balady-health-certificate.html";
      link.click();

      window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 250);
    };

    const handleNotificationSettings = async () => {
      if (!("Notification" in window)) {
        return;
      }

      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }
    };

    const handleDateModeChange = (mode: "gregorian" | "hijri") => {
      setDateMode(mode);
      window.localStorage.setItem("balady-date-mode", mode);
      setSettingsOpen(false);
    };

    const handleSettingsAction = async (item: BaladySettingsItem) => {
      if (item.action === "print") {
        window.print();
        setSettingsOpen(false);
        return;
      }

      if (item.action === "save-page") {
        handleSavePage();
        setSettingsOpen(false);
        return;
      }

      if (item.action === "notification-settings") {
        await handleNotificationSettings();
        setSettingsOpen(false);
        return;
      }

      if (item.action === "gregorian") {
        handleDateModeChange("gregorian");
        return;
      }

      handleDateModeChange("hijri");
    };

    const toggleMobileMenu = () => {
      setMobileMenuOpen((current) => {
        if (current) {
          setMobileExpanded(null);
        }

        return !current;
      });
      setSettingsOpen(false);
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
              {/* Mobile: flag row (hidden on desktop) */}
              <div className="balady-gov-flag-row">
                <span className="balady-gov-flag-mark" aria-hidden="true" />
              </div>

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
                {/* <span className="balady-gov-badge" aria-hidden="true" /> */}
              </div>

              <button
                type="button"
                className={`balady-mobile-verify-toggle ${verifyOpen ? "active" : ""}`}
                onClick={toggleVerifyPanel}
                aria-expanded={verifyOpen}
                aria-controls="balady-verify-panel"
              >
                <ChevronDownIcon />
                <span>كيف تتحقق</span>
              </button>

              <div className="balady-gov-controls">
                <div className="balady-gov-tools">
                  {BALADY_TOP_TOOLS.map((tool) =>
                    tool.id === "settings" ? (
                      <div key={tool.id} className="balady-settings-menu-wrap">
                        <button
                          type="button"
                          className={`balady-tool-link balady-tool-link-${tool.id} balady-settings-trigger ${
                            settingsOpen ? "active" : ""
                          }`}
                          onClick={toggleSettingsMenu}
                          aria-expanded={settingsOpen}
                          aria-controls="balady-settings-menu"
                        >
                          {renderTopToolIcon(tool)}
                          <p className="upper-txt">{tool.label}</p>
                        </button>

                        {settingsOpen ? (
                          <div id="balady-settings-menu" className="balady-settings-menu" role="menu">
                            {BALADY_SETTINGS_MENU.map((item) => {
                              const isActiveDateMode =
                                (item.action === "gregorian" && dateMode === "gregorian") ||
                                (item.action === "hijri" && dateMode === "hijri");

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  className={`balady-settings-item ${isActiveDateMode ? "active" : ""}`}
                                  onClick={() => {
                                    void handleSettingsAction(item);
                                  }}
                                  role="menuitem"
                                >
                                  {renderSettingsIcon(item)}
                                  <span className="balady-settings-item-label">{item.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <a
                        key={tool.id}
                        href={tool.href}
                        className={`balady-tool-link balady-tool-link-${tool.id}`}
                        {...getAnchorProps(tool.href)}
                      >
                        {renderTopToolIcon(tool)}
                        <p className={tool.id === "accessibility" ? "upper-txt" : undefined}>
                          {tool.label}
                        </p>
                      </a>
                    ),
                  )}
                </div>
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
                        <h3>{renderVerifyTitle(card)}</h3>
                        <p>{renderVerifyDescription(card)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="balady-verify-badge">
                  <a href={BALADY_VERIFY_LINK} className="balady-verify-code" {...getAnchorProps(BALADY_VERIFY_LINK)}>
                    <ExternalLinkIcon />
                    <span>{BALADY_VERIFY_BADGE.value}</span>
                  </a>
                  <div className="balady-verify-badge-copy">
                    <span>{BALADY_VERIFY_BADGE.label}</span>
                  </div>
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
