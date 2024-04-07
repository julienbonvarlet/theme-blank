import { fr } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { genesisIcons } from "@formkit/icons";

export default defineFormKitConfig(() => {
  return {
    locales: { fr },
    locale: "fr",
    icons: {
      ...genesisIcons,
      checkbox:
        '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 68 512 376"><path d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z"></path></svg>',
      inputChecked:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#000"/><path stroke="#fff" d="m4.354 7.646 3 3M6.646 10.646l5-5"/></svg>',
      loader: '<span class="f-icon-loader"></span>',
    },
  };
});
