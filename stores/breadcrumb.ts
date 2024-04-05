import { ref } from "#imports";
import { defineStore } from "pinia";

export const usePreviousTitle = defineStore("previousTitle", () => {
  // States
  const previousTitle = ref(null);

  // Actions
  const getPreviousTitle = async (pageTitle: String) => {
    previousTitle.value = pageTitle;
  };

  return {
    previousTitle,
    getPreviousTitle,
  };
});
