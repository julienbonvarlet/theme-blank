export interface AnnouncementBar {
  text: String;
  icon: String;
}

export interface TopBar {
  text: String;
}

export interface HeaderConfig {
  topBar: TopBar;
  showAnnouncementBar: boolean;
  announcementBar: AnnouncementBar;
  wishlistIcon: boolean;
  storeIcon: boolean;
}

export interface Link {
  title: String;
  url: String;
  type: "primary" | "secondary";
}

export interface Icon {
  title?: String;
  text: String;
  image: String;
}

export interface BannerConfig {
  title: String;
  text: String;
  backgroundImage: String;
  link1: Link;
  align: "left" | "center" | "right";
  size: "sm" | "md" | "lg" | "xl";
}

export interface SectionIconsConfig {
  title: String;
  icons: Icon[];
  align: "left" | "center" | "right";
}

export interface Column {
  type: "icons" | "image" | "text";
  title?: String;
  text?: String;
  src?: String;
  alt?: String;
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
