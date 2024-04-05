import { useCartData } from "#imports";
import { computed } from "vue";

export function useCartSuggestions() {
  const { cartItems } = useCartData();

  const selectedFiltersForSuggestions = computed(() => {
    const items = cartItems.value || [];
    return {
      color: Array.from(new Set(items.map((x) => x.color).filter((x) => x))),
      size: Array.from(new Set(items.map((x) => x.size).filter((x) => x))),
      type: Array.from(new Set(items.map((x) => x.type).filter((x) => x))),
      gender: Array.from(new Set(items.map((x) => x.gender).filter((x) => x))),
    };
  });

  return {
    selectedFiltersForSuggestions,
  };
}
