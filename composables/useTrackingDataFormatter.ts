export function useTrackingPlanDataFormatter() {
  type Tool = "gtm" | "matomo";

  function normalizestring(inputstring: string) {
    return inputstring
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll("é", "e")
      .replaceAll("è", "e")
      .replaceAll("ê", "e")
      .replaceAll("à", "a")
      .replaceAll("ù", "u")
      .replaceAll("ô", "o")
      .replaceAll("&", "_et_")
      .replaceAll("?", "");
  }

  function formatPrice(price: number) {
    return price ? Number(price / 100).toFixed(2) : 0.0;
  }

  const formatProduct = (tool: Tool, data: {}) => {
    try {
      let product = null;
      if (tool === "gtm") {
        product = {
          item_name: normalizestring(data.product.title),
          item_variant: normalizestring(data.choice.color),
          item_category3: normalizestring(data.choice.state),
          item_id: data.product.id,
          item_category4: normalizestring(data.choice.size),
          item_category: "",
          item_category2: "",
          price: formatPrice(data.choice.price),
          index: "",
        };
      } else if (tool === "matomo") {
        product = [data.product.id, normalizestring(data.product.title), ["", "", normalizestring(data.choice.state), normalizestring(data.choice.size)], formatPrice(data.choice.price)];
      } else {
        product = {};
      }
      return product;
    } catch (error) {
      console.error("Error in formatProduct", error);
      return {};
    }
  };

  return {
    formatProduct,
  };
}
