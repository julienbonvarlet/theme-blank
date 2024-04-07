// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@formkit/nuxt", "nuxt-icons", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      apiBaseUrl: "",
      clientId: "",
      clientSlug: "",
      clientUrlFirstHand: "",
      clientUrlSecondHand: "",
      clientMatomoUrl: "",
      clientMatomoSiteId: "",
      clientGtmId: "",
      mapboxApiKey: "",
      mapboxStyleId: "",
      stripeKey: "",
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/main.scss" as *;',
        },
      },
    },
  },
});
