export interface AnnouncementBar {
  text: string;
  icon: string;
}

export interface TopBar {
  text: string;
}

export interface HeaderConfig {
  topBar: TopBar;
  showAnnouncementBar: boolean;
  announcementBar: AnnouncementBar;
  wishlistIcon: boolean;
  storeIcon: boolean;
}

export interface Link {
  title: string;
  url: string;
  type: "primary" | "secondary";
}

export interface Icon {
  title?: string;
  text: string;
  image: string;
}

export interface BannerConfig {
  title: string;
  text: string;
  backgroundImage: string;
  link1: Link;
  align: "left" | "center" | "right";
  size: "sm" | "md" | "lg" | "xl";
}

export interface SectionIconsConfig {
  title: string;
  icons: Icon[];
  align: "left" | "center" | "right";
}

export interface Column {
  type: "icons" | "image" | "text";
  title?: string;
  text?: string;
  src?: string;
  alt?: string;
  link1?: Link;
  icons?: Icon[];
}

export interface GridRowConfig {
  maxWidth: "xl";
  marginX: boolean;
  marginY: boolean;
  align: "left" | "center" | "right";
  columns: Column[];
}

export interface SellOnlineConfig {
  banner: BannerConfig;
  sectionIcons: SectionIconsConfig;
  gridRow: GridRowConfig;
}
