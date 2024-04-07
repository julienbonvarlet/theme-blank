import type { Customer_jsonld } from "@faume-tech/sdk-recommerce";

export const useUserStore = defineStore("user", () => {
  const { $get } = useNuxtApp();
  const router = useRouter();

  const user = ref<null | Customer_jsonld>(null);
  const config = useRuntimeConfig();
  const clientId = config.public.clientId;

  const userIsGuest = computed(() => user.value && user.value?.["@type"] !== "Customer");

  const fetchCurrentUser = async () => {
    try {
      const response = await $get<Customer_jsonld>("/api/v3customer/me");
      user.value = response;
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
    }
  };

  const updateUser = async (updatedData) => {
    const data = await $API.customer.apiCustomerCustomersIdPatch(userId, updatedData);
    user.value = {
      ...user.value,
      ...data,
    };
  };

  const changePassword = async (passwordData) => {
    return await $API.customer.apiCustomerCustomersIdchangePasswordPatch(userId, passwordData);
  };

  const resetPassword = async (hashedToken, passwordData) => {
    const data = await $API.auth.apiCustomerAuthresetPasswordHashedTokenPatch(hashedToken, passwordData);
    if (typeof data === "object" && data.email) {
      user.value = data;
      router.push({ name: "account" });
    }
    return data;
  };

  const sendResetPasswordByEmail = async (email: String) => {
    return await $API.auth.apiCustomerAuthresetPasswordPost({
      email: email,
      client: clientId,
    });
  };

  const setUser = (data: Customer_jsonld) => (user.value = data);

  return {
    user,
    fetchCurrentUser,
    updateUser,
    setUser,
    changePassword,
    sendResetPasswordByEmail,
    resetPassword,
    userIsGuest,
  };
});
