export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  return {
    provide: {
      async getCollection<ApiCollection>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "GET",
          baseURL: config.public.apiBaseUrl,
          headers: {
            "Content-Type": "application/ld+json",
            "X-Brand-Id": config.public.clientId,
          },
          ...args[1],
        });

        const pagination =
          response["hydra:view"] === undefined
            ? { totalItems: response["hydra:totalItems"] }
            : {
                totalItems: response["hydra:totalItems"],
                firstPage: response["hydra:view"]["hydra:first"],
                lastPage: response["hydra:view"]["hydra:last"] ?? null,
                previousPage: response["hydra:view"]["hydra:previous"] ?? null,
                nextPage: response["hydra:view"]["hydra:next"] ?? null,
              };

        return {
          items: response["hydra:member"],
          pagination,
        } as ApiCollection;
      },

      async get<ApiItem>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "GET",
          baseURL: config.public.apiBaseUrl,
          headers: {
            "Content-Type": "application/ld+json",
            "X-Brand-Id": config.public.clientId,
          },
          ...args[1],
        });

        return {
          pagination: response["@id"],
        };
      },
    },
  };
});
