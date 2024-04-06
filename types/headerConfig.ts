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
