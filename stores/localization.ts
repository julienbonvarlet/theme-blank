import { defineStore } from "pinia";

interface LocalizationState {
  locale: string;
  country: string;
}

export const useLocalizationStore = defineStore("localization", {
  state: (): LocalizationState => ({
    locale: "fr-FR",
    country: "FR",
  }),
});
