export const useUserStore = defineStore("user", () => {
  const { $API } = useNuxtApp();
  const router = useRouter();

  const user = ref(null);
  const config = useRuntimeConfig();
  const clientId = config?.public?.faume?.clientId;

  const userIsGuest = computed(() => user.value && user.value?.["@type"] !== "Customer");

  const fetchCurrentUser = async () => {
    try {
      const response = await $API.customer.apiCustomerMeGet();
      user.value = response;
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const data = await $API.customer.apiCustomerCustomersIdPatch(userId, updatedData);
      user.value = {
        ...user.value,
        ...data,
      };
      console.log("Informations utilisateur mises à jour");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations utilisateur:", error);
      throw error;
    }
  };

  const changePassword = async (userId, passwordData) => {
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

  const sendResetPasswordByEmail = async (email) => {
    return await $API.auth.apiCustomerAuthresetPasswordPost({
      email: email,
      client: clientId,
    });
  };

  const setUser = (data) => (user.value = data);

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
