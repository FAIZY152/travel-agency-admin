export type BaladyLink = {
  label: string;
  href: string;
};

export type BaladyTopTool = BaladyLink & {
  id: string;
  icon: "gear" | "access";
};

export type BaladyVerifyCard = {
  id: string;
  title: string;
  description: string;
  icon: "link" | "lock";
};

export type BaladySection = {
  id: string;
  title?: string;
  links: BaladyLink[];
};

export type BaladyPanel = {
  layout: "grid" | "list";
  sections: BaladySection[];
  cta?: BaladyLink;
  highlightLink?: BaladyLink;
};

 
export type BaladyNavItem = {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  panel?: BaladyPanel;
};

export const BALADY_BRAND_LINK = "https://balady.gov.sa/ar";

export const BALADY_SEARCH_LINK = "https://balady.gov.sa/ar/search";

export const BALADY_BUSINESS_LINK: BaladyLink = {
  label: "بلدي أعمال",
  href: "https://apps.balady.gov.sa/Eservices/",
};

export const BALADY_VERIFY_LINK = "https://raqmi.dga.gov.sa/";

export const BALADY_VERIFY_BADGE = {
  label: "مسجل لدى هيئة الحكومة الرقمية برقم:",
  value: "20250428339",
};

export const BALADY_TOP_TOOLS: BaladyTopTool[] = [
  {
    id: "settings",
    label: "الإعدادات",
    href: "#",
    icon: "gear",
  },

  {
    id: "accessibility",
    label: "أدوات سهولة الوصول",
    href: "#",
    icon: "access",
  },
];

export const BALADY_VERIFY_CARDS: BaladyVerifyCard[] = [
  {
    id: "gov-domain",
    title: "روابط المواقع الالكترونية الرسمية السعودية تنتهي بـ gov.sa",
    description:
      "جميع روابط المواقع الرسمية التابعة للجهات الحكومية في المملكة العربية السعودية تنتهي بـ gov.sa",
    icon: "link",
  },
  {
    id: "gov-https",
    title: "المواقع الالكترونية الحكومية تستخدم بروتوكول HTTPS للتشفير و الأمان.",
    description:
      "المواقع الالكترونية الآمنة في المملكة العربية السعودية تستخدم بروتوكول HTTPS للتشفير.",
    icon: "lock",
  },
];

export const BALADY_NAV_ITEMS: BaladyNavItem[] = [
  {
    id: "about",
    label: "عن بلدي",
    panel: {
      layout: "list",
      sections: [
        {
          id: "about-1",
          links: [
            { label: "من نحن", href: "https://balady.gov.sa/ar/about-balady/about-us" },
            { label: "الهيكل التنظيمي", href: "https://balady.gov.sa/ar/ministry-structure" },
            { label: "الأنظمة واللوائح", href: "https://balady.gov.sa/ar/rules" },
            { label: "السياسات والاستراتيجيات", href: "https://balady.gov.sa/ar/about-balady/policy" },
          ],
        },
        {
          id: "about-2",
          links: [
            { label: "المنافسات والمشتريات", href: "https://balady.gov.sa/ar/tenders-and-procurement" },
            { label: "الميزانية والمصروفات", href: "https://balady.gov.sa/ar/budget-statistics" },
            { label: "التنمية المستدامة", href: "https://balady.gov.sa/ar/about-balady/policy" },
            { label: "الشراكات", href: "https://balady.gov.sa/ar/partners" },
          ],
        },
        {
          id: "about-3",
          links: [
            { label: "المشاركة الإلكترونية", href: "https://balady.gov.sa/ar/e-participation" },
            { label: "البيانات المفتوحة", href: "https://balady.gov.sa/ar/open-data" },
            { label: "الأخبار", href: "https://balady.gov.sa/ar/news" },
            { label: "الفعاليات", href: "https://balady.gov.sa/ar/events-list" },
          ],
        },
        {
          id: "about-4",
          links: [
            { label: "المبادرات", href: "https://balady.gov.sa/ar/initiatives" },
            { label: "البيانات والإحصائيات", href: "https://balady.gov.sa/ar/e-participation/11180" },
            { label: "الوظائف", href: "https://balady.gov.sa/ar/recruitment" },
            { label: "المساعدة والدعم", href: "https://balady.gov.sa/ar/help-and-support" },
          ],
        },
      ],
    },
  },
  {
    id: "services",
    label: "الخدمات",
    active: true,
    panel: {
      layout: "grid",
      sections: [
        {
          id: "personal-pages",
          title: "الصفحات الشخصية",
          links: [
            { label: "إدارة الطلبات", href: "https://apps.balady.gov.sa/Eservices/Inquiries/Request" },
            { label: "إدارة الرخص", href: "https://apps.balady.gov.sa/Eservices/Inquiries/Licenses" },
          ],
        },
        {
          id: "commercial",
          title: "الرخص التجارية",
          links: [
            { label: "إصدار رخصة تجارية", href: "https://balady.gov.sa/services/11010" },
            { label: "تجديد رخصة نشاط تجاري", href: "https://balady.gov.sa/services/10485" },
            { label: "إلغاء رخصة نشاط تجاري", href: "https://balady.gov.sa/services/10492" },
          ],
        },
        {
          id: "construction",
          title: "الرخص الإنشائية",
          links: [
            { label: "إصدار رخصة بناء", href: "https://balady.gov.sa/services/10472" },
            { label: "خدمة إصدار رخصة بناء", href: "https://balady.gov.sa/services/10538" },
            { label: "رخصة تسوير أراضي فضاء", href: "https://balady.gov.sa/services/10538" },
          ],
        },
        {
          id: "health",
          title: "الشهادات الصحية",
          links: [
            { label: "إصدار شهادة صحية", href: "https://balady.gov.sa/services/10592" },
            { label: "تجديد شهادة صحية", href: "https://balady.gov.sa/services/10596" },
          ],
        },
      ],
      cta: {
        label: "عرض المزيد",
        href: "https://balady.gov.sa/services",
      },
      highlightLink: {
        label: "صوت العميل",
        href: "https://balady.gov.sa/ar/form/customer-feedback",
      },
    },
  },
  {
    id: "inquiries",
    label: "الاستعلامات",
    href: "https://balady.gov.sa/ar/general-inquiries",
  },
  {
    id: "contact",
    label: "تواصل معنا",
    panel: {
      layout: "list",
      sections: [
        {
          id: "contact-list",
          links: [
            { label: "الإبلاغ عن شبهة فساد", href: "https://momah.gov.sa/ar/report-corruption" },
            { label: "اتصل بنا", href: "https://balady.gov.sa/ar/form/contact-us" },
            { label: "وسائل التواصل الإجتماعي", href: "https://balady.gov.sa/ar/help-and-support/social-media" },
            { label: "الأسئلة الشائعة", href: "https://balady.gov.sa/ar/help-and-support/faq-list" },
            { label: "دليل فروع الوزارة", href: "https://balady.gov.sa/ar/branches/ministry" },
            { label: "الأمانات الافتراضية", href: "https://balady.gov.sa/services" },
            { label: "حجز موعد", href: "https://balady.gov.sa/ar/services" },
            { label: "الدعم الفني بلغة الإشارة", href: "https://metaverse.sakani.sa/mv" },
            { label: "دليل الامانات", href: "https://balady.gov.sa/ar/branches/amana" },
            { label: "التواصل مع مكتب معالي الوزير", href: "https://balady.gov.sa/ar/services" },
          ],
        },
      ],
    },
  },
];
