import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useTradeInModule } from "../stores/tradeInModule";

export default defineNuxtRouteMiddleware((to) => {
  const tradeInStore = useTradeInModule();
  const { cart, cartAgree } = tradeInStore;

  if (to.name === "trade-in" || to.path === "/pages/trade-in") {
    return navigateTo({ name: "trade-in-customer-step-1" });
  }

  const cartIsEmpty = !cart?.items?.length;
  const cartIsValidated = !!cart?.validatedAt;
  const isCustomer = to.name.includes("customer");
  const step = Number(to.name?.split("-")?.slice(-1)?.[0] || 1);

  if (isCustomer) {
    if (step > 1 && (!cart || cartIsEmpty)) {
      return navigateTo({ name: "trade-in-customer-step-1" });
    } else if (step > 3 && !cartIsValidated) {
      return navigateTo({ name: "trade-in-customer-step-3" });
    } else if ((step === 3 || step === 2) && cartIsValidated) {
      return navigateTo({ name: "trade-in-customer-step-4" });
    } else if (step > 2 && !cartAgree) {
      return navigateTo({ name: "trade-in-customer-step-2" });
    }
  }
});
