import type { ApiResponse } from "~/types/types";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const accessToken = auth.getAccessToken();

  type BaseRequest = {
    baseURL: string;
    headers: Record<string, string>;
  };

  const baseRequestOptions: BaseRequest = {
    baseURL: config.public.apiBaseUrl,
    headers: {
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      "X-Brand-Id": config.public.clientId,
    },
  };
  if (accessToken) {
    baseRequestOptions.headers.Authorization = `Bearer ${accessToken}`;
  }

  return {
    provide: {
      async getCollection<ApiCollection>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "GET",
          ...baseRequestOptions,
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

        const facets = response["hydra:facets"] === undefined ? [] : response["hydra:facets"];

        return {
          items: response["hydra:member"],
          pagination,
          facets,
        } as ApiCollection;
      },
      async get<ApiItem>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "GET",
          ...baseRequestOptions,
          ...args[1],
        });

        return response as ApiItem;
      },
      async post<ApiItem>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "POST",
          ...baseRequestOptions,
          ...args[1],
        });

        return response as ApiItem;
      },
      async patch<ApiItem>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "PATCH",
          ...baseRequestOptions,
          ...args[1],
        });

        return response as ApiItem;
      },
      async delete<ApiItem>(...args: Parameters<typeof $fetch>) {
        const response = await $fetch<ApiResponse>(args[0], {
          method: "DELETE",
          ...baseRequestOptions,
          ...args[1],
        });

        return response as ApiItem;
      },
    },
  };
});
