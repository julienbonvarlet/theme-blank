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
