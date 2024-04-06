const { sortSizes } = useSort();

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60,
};

export const useTradeInModule = defineStore("tradeInModule", () => {
  const article = useCookie("tradeInModuleArticle", {
    ...cookieOptions,
    default: () => ({
      sku: null,
      color: null,
      size: null,
      condition: null,
    }),
  });
  const cart = useCookie("tradeInModuleCart", cookieOptions);
  const cartAgree = useCookie("tradeInModuleCartAgree", {
    ...cookieOptions,
    default: () => false,
  });
  const colors = ref<string[] | null>(null);
  const sizes = ref<string[] | null>(null);
  const conditions = ref<string[]>(["new", "excellent", "very_good"]);
  const isInvalidSku = ref(false);
  const isValidSku = ref(false);
  const skuSuggestions = ref<string[] | null>(null);
  const channel = useCookie("tradeInModuleChannel", {
    ...cookieOptions,
    default: () => "web",
  });
  const agree = useCookie("tradeInModuleAgree", {
    ...cookieOptions,
    default: () => false,
  });
  const selectedAddress = useCookie("tradeInModuleSelectedAddress", cookieOptions);

  const setAgree = (value) => {
    agree.value = value;
  };

  const getSku = debounce(async () => {
    skuSuggestions.value = null;
    isInvalidSku.value = false;
    isValidSku.value = false;
    const sku = article.value.sku;
    const { $API } = useNuxtApp();
    if (sku && sku !== "") {
      try {
        const response = await $API.tradeIn.apiCustomerTradeInssearchBySkuSkuGet(sku);
        skuSuggestions.value = response?.results?.slice(0, 20);
        if (!skuSuggestions.value?.length) {
          isInvalidSku.value = true;
        } else if (skuSuggestions.value?.includes(sku)) {
          isValidSku.value = true;
        }
      } catch (error) {
        isInvalidSku.value = true;
        throw error;
      }
    }
  }, 300);

  const getSizesAndColors = async () => {
    colors.value = null;
    sizes.value = null;
    const { $API } = useNuxtApp();
    const response = await $API.tradeIn.apiCustomerTradeInsgetAvailableSizesAndColorsSkuGet(article.value.sku);
    colors.value = sortBy(response.color) || [];
    sizes.value = sortSizes(response.size) || [];
  };

  const setCart = (data) => {
    cart.value = data;
  };

  const createCart = async () => {
    const { $API } = useNuxtApp();
    const data = await $API.tradeInCart.apiCustomerTradeInCartsPost({
      channel: channel.value,
    });
    setCart(data);
  };

  const addToCart = async () => {
    if (!cart.value) {
      await createCart();
    }
    const { $API } = useNuxtApp();
    const newArticle = await $API.tradeIn.apiCustomerTradeInsPost({
      ...article.value,
      tradeInCart: cart.value["@id"],
    });
    setCart({ ...cart.value, items: [...cart.value.items, newArticle] });
    article.value = {
      size: null,
      color: null,
      condition: null,
      sku: null,
    };
    return newArticle;
  };

  const removeFromCart = (id) => {
    if (id) {
      setCart({
        ...cart.value,
        items: [...cart.value.items.filter((x) => x.id !== id)],
      });
      const { $API } = useNuxtApp();
      $API.tradeInCartItem.apiCustomerTradeInCartItemsIdDelete(id);
    }
  };

  const setArticle = (name, value) => {
    article.value = {
      ...article.value,
      [name]: value,
    };
  };

  const setSku = (value = null) => {
    article.value = {
      sku: value,
      color: null,
      size: null,
      condition: null,
    };
  };

  const reset = () => {
    article.value.size = null;
    article.value.color = null;
    article.value.condition = null;
    article.value.sku = null;
    cart.value = null;
    colors.value = null;
    sizes.value = null;
    agree.value = false;
    selectedAddress.value = null;
  };

  const selectAddress = async (id) => {
    selectedAddress.value = id;
    const { $API } = useNuxtApp();
    const response = await $API.tradeInCart.apiCustomerTradeInCartsIdPatch(cart.value.id, {
      shippingAddress: selectedAddress.value,
    });
    setCart(response);
  };

  const confirmCart = async () => {
    const { $API } = useNuxtApp();
    const response = await $API.tradeInCart.apiCustomerTradeInCartsIdvalidatePatch(cart.value.id, {});
    setCart(response);
  };

  const setCartAgree = (value) => {
    cartAgree.value = value;
  };

  const resumeTradeIn = (tradeIn) => {
    channel.value = "web";
    cartAgree.value = true;
    agree.value = true;
    cart.value = { ...tradeIn };
    selectedAddress.value = tradeIn.shippingAddress;
  };

  return {
    article,
    cart,
    colors,
    sizes,
    conditions,
    skuSuggestions,
    isValidSku,
    isInvalidSku,
    getSku,
    agree,
    selectedAddress,
    cartAgree,
    getSizesAndColors,
    addToCart,
    setArticle,
    reset,
    removeFromCart,
    setAgree,
    selectAddress,
    confirmCart,
    setCartAgree,
    setSku,
    resumeTradeIn,
  };
});
