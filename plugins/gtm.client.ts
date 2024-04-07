import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(
    createGtm({
      id: config.public.clientGtmId,
      defer: false,
      compatibility: false,
      enabled: true,
      debug: false,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    }),
  );
});
