export default defineNuxtPlugin(() => {
  const { formatProduct } = useTrackingPlanDataFormatter();

  // À remettre pour le tracking externe
  // const gtmPush = (data) => {
  //   if (process.client) {
  //     window.dataLayer?.push(data);
  //   }
  // };
  // À remettre pour le tracking externe

  const matomoPush = (data) => {
    const _paq = (window._paq = window._paq || []);
    _paq?.push(data);
  };

  const trackingPlan = {
    purchaseViewProductPage: (data) => {
      // const gtmProduct = formatProduct("gtm", data); À remettre pour le tracking externe
      // À remettre pour le tracking interne
      // gtmPush({
      //   event: "view_item",
      //   event_category: "ecommerce",
      //   ecommerce: {
      //     currency: "EUR",
      //     nbr_images: data.choice.photos.length,
      //     items: [gtmProduct],
      //   },
      // });
      // À remettre pour le tracking externe

      const matomoProduct = formatProduct("matomo", data);
      matomoPush(["setEcommerceView", ...matomoProduct]);
      matomoPush(["trackEvent", "E-commerce Purchase", "pageview", "purchase_view_item", Number(data.choice.price / 100).toFixed(2)]);
    },
    purchaseAddToCart: (data) => {
      const matomoProduct = formatProduct("matomo", data);
      matomoPush(["addEcommerceItem", ...matomoProduct, 1]);
      matomoPush(["trackEcommerceCartUpdate", Number(data.cartValue / 100).toFixed(2)]);
      matomoPush(["trackEvent", "E-commerce Purchase", "pageview", "purchase_add_to_cart", Number(data.choice.price / 100).toFixed(2)]);
    },
    purchaseRemoveFromCart: (data) => {
      matomoPush(["removeEcommerceItem", data.product.id, 1]);
      matomoPush(["trackEcommerceCartUpdate", Number((data.cartValue - data.product.total) / 100).toFixed(2)]);
      matomoPush(["trackEvent", "E-commerce Purchase", "pageview", "purchase_remove_from_cart", Number(data.product.total / 100).toFixed(2)]);
    },
    purchaseViewCart: (cartValue: number) => {
      matomoPush(["trackEvent", "E-commerce Purchase", "pageview", "purchase_view_cart", Number(cartValue / 100).toFixed(2)]);
    },
    purchaseCheckoutStarted: (cartValue: number) => {
      matomoPush(["trackEvent", "E-commerce Purchase", "pageview", "purchase_checkout_started", Number(cartValue / 100).toFixed(2)]);
    },
    purchaseCompleted: (data) => {
      matomoPush(["trackEcommerceOrder", data.cartValue.reference, Number(data.cartValue.total / 100).toFixed(2)]);
      matomoPush(["trackEvent", "E-commerce Purchase", "pageview", "purchase_completed", Number(data.cartValue.total / 100).toFixed(2)]);
    },

    tradeinViewSellPage: () => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "sell_view"]);
    },
    tradeinViewCondition: () => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_view_conditions"]);
    },
    tradeinViewProductIdentification: () => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_view_product_identification"]);
    },
    tradeinViewCart: (cartValue: number) => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_view_cart", Number(cartValue / 100).toFixed(2)]);
    },
    tradeinRemoveFromCart: (removeValue: number) => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_remove_from_cart", Number(removeValue / 100).toFixed(2)]);
    },
    tradeinViewUserIdentification: () => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_view_user_identification"]);
    },
    tradeinViewShippingAddress: () => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_view_shipping_address"]);
    },
    tradeinCompleted: (tradeinValue: number) => {
      matomoPush(["trackEvent", "E-commerce Resale", "pageview", "trade-in_completed", Number(tradeinValue / 100).toFixed(2)]);
    },
  };

  return {
    provide: {
      trackingPlan: trackingPlan,
    },
  };
});
