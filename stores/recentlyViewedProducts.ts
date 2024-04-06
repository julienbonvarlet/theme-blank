interface Product {
  id: string | number;
  [key: string]: any;
}

export const useRecentlyViewedProductsStore = defineStore("recentlyViewedProducts", () => {
  let productsInit: Product[] = [];
  if (process.client) {
    productsInit = useLocalStorage<Product[]>("recentlyViewedProducts", []).value;
  }

  const products = ref<Product[]>(productsInit);
  const activeProduct = ref<Product | null>(null);

  const addProduct = (product: Product) => {
    if (product && product.id !== undefined) {
      activeProduct.value = product;
      const existingIndex = products.value.findIndex((x) => x.id === product.id);
      if (existingIndex === -1) {
        products.value.unshift(product);
      } else {
        products.value.splice(existingIndex, 1);
        products.value.unshift(product);
      }
    }
  };

  const allowedProducts = computed(() => {
    if (products.value.length && activeProduct.value) {
      return products.value.filter((x) => x.id !== activeProduct.value.id);
    }
    return products.value;
  });

  return {
    products,
    allowedProducts,
    addProduct,
  };
});
