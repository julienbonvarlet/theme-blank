import {
  type Customer_ChangePasswordInput,
  type Customer_CustomerInput,
  type Customer_jsonld,
  type ResetPassword_ResetPasswordConfirmInput,
  type ResetPassword_ResetPasswordInput_jsonld,
} from "@faume-tech/sdk-recommerce";

export const useUserStore = defineStore("user", () => {
  const user = ref<Customer_jsonld | null>(null);

  const userIsGuest = computed(() => user.value && user.value?.["@type"] !== "Customer");

  const fetchCurrentUser = async () => {
    const response = await useNuxtApp().$get<Customer_jsonld>("/api/v3/customer/me");
    user.value = response;
    return response;
  };

  const updateUser = async (customerId: string, updatedData: Customer_CustomerInput) => {
    const response = await useNuxtApp().$patch<Customer_jsonld>(`/api/v3/customer/customers/${customerId}`, { body: updatedData });
    user.value = response;
  };

  const changePassword = async (passwordData: Customer_ChangePasswordInput) => {
    return await useNuxtApp().$patch("/api/v3/customer/customers/{id}/change-password", { body: passwordData });
  };

  const resetPassword = async (hashedToken: string, passwordData: ResetPassword_ResetPasswordConfirmInput) => {
    await useNuxtApp().$patch<ResetPassword_ResetPasswordInput_jsonld>(`/api/v3/customer/auth/reset-password/${hashedToken}`, { body: passwordData });

    await navigateTo("/auth/login");
  };

  const sendResetPasswordByEmail = async (email: String) => {
    return await useNuxtApp().$post("/api/v3/customer/auth/reset-password", { body: { email } });
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
