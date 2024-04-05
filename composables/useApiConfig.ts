export function getAxiosConfig(apiConfig: object = {}) {
  return {
    baseURL: apiConfig.BASE,
    headers: apiConfig.HEADERS,
    withCredentials: apiConfig.WITH_CREDENTIALS,
  };
}
