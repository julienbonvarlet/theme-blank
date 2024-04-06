export const usePagesProducts = async () => {
  const productStore = useProductsStore();
  const { data: products } = await useAsyncData("products", () =>
    productStore.fetchProducts(),
  );
  return {
    products,
  };
};
