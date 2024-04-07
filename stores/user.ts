import {
  type Customer_ChangePasswordInput,
  type Customer_CustomerInput,
  type Customer_jsonld,
  type ResetPassword_ResetPasswordConfirmInput,
  type ResetPassword_ResetPasswordInput_jsonld,
} from "@faume-tech/sdk-recommerce";

export const useUserStore = defineStore("user", () => {
  const { $get, $patch, $post } = useNuxtApp();
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

  const updateUser = async (customerId: string, updatedData: Customer_CustomerInput) => {
    const response = await $patch<Customer_jsonld>(`/api/v3/customer/customers/${customerId}`, { body: updatedData });
    user.value = response;
  };

  const changePassword = async (passwordData: Customer_ChangePasswordInput) => {
    return await $patch("/api/v3/customer/customers/{id}/change-password", { body: passwordData });
  };

  const resetPassword = async (hashedToken: string, passwordData: ResetPassword_ResetPasswordConfirmInput) => {
    const data = await $patch<ResetPassword_ResetPasswordInput_jsonld>(`/api/v3/customer/auth/reset-password/${hashedToken}`, { body: passwordData });

    await navigateTo("/auth/login");
  };

  const sendResetPasswordByEmail = async (email: String) => {
    return await $post("/api/v3/customer/auth/reset-password", {
      body: {
        email: email,
        client: clientId,
      },
    });
  };

  const setUser = (data: Customer_jsonld | null) => (user.value = data);

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
