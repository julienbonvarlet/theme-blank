export {};

declare global {
  interface AnnouncementBar {
    text: string;
    icon: string;
  }

  interface TopBar {
    text: string;
  }

  interface HeaderConfig {
    topBar: TopBar;
    showAnnouncementBar: boolean;
    announcementBar: AnnouncementBar;
    wishlistIcon: boolean;
    storeIcon: boolean;
  }

  interface Link {
    title: string;
    url: string;
    type: "primary" | "secondary";
  }

  interface Icon {
    title?: string;
    text: string;
    image: string;
  }

  interface BannerConfig {
    title: string;
    text: string;
    backgroundImage: string;
    link1: Link;
    align: "left" | "center" | "right";
    size: "sm" | "md" | "lg" | "xl";
  }

  interface SectionIconsConfig {
    title: string;
    icons: Icon[];
    align: "left" | "center" | "right";
  }

  interface Column {
    type: "icons" | "image" | "text";
    title?: string;
    text?: string;
    src?: string;
    alt?: string;
    link1?: Link;
    icons?: Icon[];
  }

  interface GridRowConfig {
    maxWidth: "xl";
    marginX: boolean;
    marginY: boolean;
    align: "left" | "center" | "right";
    columns: Column[];
  }

  interface SellOnlineConfig {
    banner: BannerConfig;
    sectionIcons: SectionIconsConfig;
    gridRow: GridRowConfig;
  }

  type IconNames =
    | "calendar"
    | "cart"
    | "check"
    | "click"
    | "copy"
    | "cross"
    | "dot"
    | "down"
    | "download"
    | "export"
    | "eye-closed"
    | "eye-opened"
    | "facebook"
    | "faq"
    | "gift-card"
    | "grid-4"
    | "grid-9"
    | "heart-empty"
    | "heart-full"
    | "help"
    | "house"
    | "store"
    | "instagram"
    | "left"
    | "linkedin"
    | "loader"
    | "location"
    | "mail"
    | "marker"
    | "menu"
    | "minus"
    | "pinterest"
    | "plus"
    | "return"
    | "right"
    | "search"
    | "shipping"
    | "shirt"
    | "star"
    | "tiktok"
    | "time"
    | "trash"
    | "twitter"
    | "up"
    | "user"
    | "voucher"
    | "wallet"
    | "write"
    | "youtube"
    | "sso-google"
    | "sso-facebook"
    | "card"
    | "paypal"
    | "apple_pay"
    | "google_pay";

  type ButtonSizes = "s" | "m" | "l";

  type ButtonColors =
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success";

  type TitleSizes = "xs" | "s" | "m" | "l" | "xl";

  type TitleTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

  type TextSizes = "xs" | "s" | "m";

  type TextWeights = "regular" | "light" | "bold";

  type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

  type SubtitleTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

  type WrapperWidths = "s" | "m" | "l" | "xl";

  type LoaderSizes = "s" | "m" | "l";

  type PriceSizes = "s" | "m" | "l";

  type BannerSizes = "m" | "l";

  type TagStatusColors = "dark" | "light" | "error" | "success";

  type FieldBoxSizes = "m" | "s";
}
