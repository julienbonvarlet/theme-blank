import VueMatomo from "vue-matomo";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueMatomo, {
    host: config.public.clientMatomoUrl,
    siteId: config.public.clientMatomoSiteId,
    // Enables automatically registering pageviews on the router
    router: nuxtApp.$router,
    enableLinkTracking: true,
    requireConsent: true,
    trackInitialView: true,
    disableCookies: false,
    requireCookieConsent: true,
  });
});
