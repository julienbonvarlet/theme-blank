export const useAuthStore = defineStore("auth", () => {
  const route = useRoute();
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const clientId = config?.public?.faume?.clientId;
  const { $API } = useNuxtApp();

  const cookieConfig = {
    secure: process.env.NODE_ENV === "production", // Sécurisé en production
    sameSite: "lax", // ou 'strict' selon vos besoins
    maxAge: 7 * 24 * 60 * 60,
  };
  const authToken = useCookie("auth-token", cookieConfig);
  const authGuestToken = useCookie("auth-guest-token", cookieConfig);
  const ssoPreviousRoute = useCookie("sso-previous-route", cookieConfig);

  const userId = ref(null);
  const userGuestId = ref(false);

  const setUser = (data, isGuest = false) => {
    if (isGuest) {
      // Si l'utilisateur est un invité, utilisez authGuestToken
      authGuestToken.value = data.token;
      userGuestId.value = true; // Marquez correctement l'utilisateur comme invité
    } else {
      // Sinon, utilisez authToken pour un utilisateur pleinement authentifié
      authToken.value = data.token;
      userGuestId.value = false; // Assurez-vous que userGuestId reflète correctement le statut de l'utilisateur
    }
    userId.value = data.id;
    userStore.setUser(data);
  };

  const login = async (loginData: LoginForm) => {
    try {
      const requestBody = {
        email: loginData.email,
        password: loginData.password,
      };
      const response = await $API.auth.apiCustomerAuthloginPost(requestBody);
      setUser(response);
      return response;
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        throw new Error(error.message);
      } else {
        throw new Error("Une erreur inconnue est survenue");
      }
    }
  };

  const register = async (registerData: RegisterForm) => {
    const requestBody = {
      gender: registerData.gender,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password,
      birthdate: registerData.birthdate,
      countryCode: registerData.countryCode,
      locale: registerData.locale,
      emailSubscription: !!registerData.emailSubscription,
      smsSubscription: !!registerData.smsSubscription,
    };
    const response = await $API.auth.apiCustomerAuthregisterPost(requestBody);
    setUser(response);
    return response;
  };

  const registerAsGuest = async (data) => {
    const requestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      countryCode: data.countryCode || "FRA",
      locale: data.locale || "fr_FR",
    };
    const response =
      await $API.auth.apiCustomerAuthregisterGuestPost(requestBody);
    setUser(response);
    return response;
  };

  // Suivre une commande
  const guestLogin = async (orderReference) => {
    try {
      const response = await $API.auth.apiCustomerAuthguestLoginPost({
        orderReference,
      });
      userGuestId.value = true;
      setUser(response, true);
      return response;
    } catch (error) {
      console.error("Erreur lors du suivi d'une commande:", error);
      throw error;
    }
  };

  const guestIsAuthenticated = () => {
    return authGuestToken.value != null;
  };

  const checkEmailExists = async (email) => {
    const res = await $API.auth.apiCustomerAuthcheckEmailPost({ email });
    return !!res;
  };

  const enableAccount = async (data) => {
    return await $API.auth.apiCustomerAuthenableAccountPost(data);
  };

  const logout = () => {
    userStore.setUser(null);
    authToken.value = null;
  };

  const isAuthenticated = () => {
    return authToken.value != null;
  };

  const connectSSO = (provider: "facebook" | "google" = "facebook") => {
    ssoPreviousRoute.value = route.name;
    window.location = `https://api.faume.co/api/v3/customer/auth/connect/${provider}?brand=${clientId}`;
  };

  const getUserFromSSO = async (provider: "facebook" | "google", brandId) => {
    const response = await axios.get(
      `https://api.faume.co/api/v3/customer/auth/connect/${provider}/${brandId}/check${window.location.search}`,
      {
        headers: {
          "X-Brand-Id": clientId,
        },
      },
    );
    const user = response.data;
    authToken.value = user.token;
    userId.value = user.id;
    userStore.setUser(user);
    return user;
  };

  watch(
    [authToken, authGuestToken],
    ([auth, guestAuth]) => {
      const token = auth || guestAuth;
      if (token) {
        $API.request.config.HEADERS["Authorization"] = `Bearer ${token}`;
      } else {
        delete $API.request.config.HEADERS["Authorization"];
      }
    },
    { immediate: true },
  );

  return {
    authToken,
    authGuestToken,
    ssoPreviousRoute,
    login,
    register,
    guestLogin,
    checkEmailExists,
    logout,
    isAuthenticated,
    guestIsAuthenticated,
    connectSSO,
    getUserFromSSO,
    enableAccount,
    registerAsGuest,
  };
});
