export const useProductsSuggestions = () => {
  const config = useRuntimeConfig();
  const defaultProducts = ref<null | object[]>(null);
  const products = ref<object[]>([]);
  const filters = ref<string[]>([]);

  const fetchProducts = async (filtersUrl?: string) => {
    const response = await fetch(`https://api.faume.co/api/v3/customer/articles?page=1&itemsPerPage=20${filtersUrl || ""}`, { headers: { "X-Brand-Id": config.clientId } });
    const data = await response.json();
    return data["hydra:member"];
  };

  const displayDefaultProducts = async () => {
    if (!defaultProducts.value?.length) {
      defaultProducts.value = await fetchProducts();
    }
    products.value = [...defaultProducts.value];
  };

  const getProducts = async () => {
    const filtersUrl = filters.value?.length ? `&${filters.value.join("&")}` : "";
    products.value = await fetchProducts(encodeURIComponent(filtersUrl));
    if (!products.value?.length) {
      if (filters.value?.length > 1) {
        filters.value.splice(-1);
        await getProducts();
      } else {
        await displayDefaultProducts();
      }
    }
  };

  const getSuggestions = async (props: object) => {
    filters.value = [];
    for (const name in props) {
      const value = props[name];
      if (value?.length) {
        if (typeof value === "string") {
          filters.value.push(`${name}_filters=${value}`);
        } else {
          // If value is array, example in cart
          filters.value.push(value.map((x) => `${name}_filters[]=${x}`).join("&"));
        }
      }
    }
    if (filters.value?.length) {
      await getProducts();
    } else {
      await displayDefaultProducts();
    }
  };

  const unsetProducts = () => {
    products.value = [];
  };

  return {
    products,
    getSuggestions,
    unsetProducts,
  };
};
