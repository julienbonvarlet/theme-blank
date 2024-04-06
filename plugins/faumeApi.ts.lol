import { FaumeApi } from "@faume-tech/sdk-recommerce";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const API = new FaumeApi({
    BASE: config.apiBaseUrl,
  });
  API.request.config.HEADERS = {
    "X-Brand-Id": config.clientId,
    Accept: "application/ld+json",
  };

  API.article.apiCustomerArticlesGetCollection();

  return {
    provide: {
      API: API,
    },
  };
});
