import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";

export const useArticleChoiceStore = defineStore("articleChoice", () => {
  const { $API } = useNuxtApp();

  // State
  const articleChoice = ref({});

  // Action to fetch a specific ArticleChoice by ID
  const fetchArticleChoiceById = async (id) => {
    try {
      const response =
        await $API.articleChoice.apiCustomerArticleChoicesIdGet(id);
      articleChoice.value = response;
      return articleChoice.value;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération d'un choix d'article:",
        error,
      );
      throw error;
    }
  };

  return {
    articleChoice,
    fetchArticleChoiceById,
  };
});
