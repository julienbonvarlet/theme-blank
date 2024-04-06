export async function fetchData(url: string, apiConfig: object = {}) {
  if (!url) {
    return null;
  }
  const config = getAxiosConfig(apiConfig);
  const response = await axios.get(url, config);
  return response.data;
}

export async function fetchAllData(urls: string[], apiConfig: object = {}) {
  if (!urls?.length) {
    return null;
  }
  let responses = await Promise.all(urls.map((url) => fetchData(url, apiConfig)));
  responses = responses.filter((x) => x !== null);
  return responses;
}
