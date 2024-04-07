import type { Login_LoginInput_jsonld } from "@faume-tech/sdk-recommerce";

export const useAuthStore = defineStore("auth", () => {
  const route = useRoute();
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const clientId = config.public.clientId;
  const { $post } = useNuxtApp();

  const accessToken = useCookie<string>("access_token");
  const accessTokenGuest = useCookie<string>("access_token_guest");
  const ssoPreviousRoute = useCookie<string>("sso-previous-route");

  const userId = ref(null);
  const userGuestId = ref(false);

  const setUser = (data, isGuest = false) => {
    if (isGuest) {
      // Si l'utilisateur est un invité, utilisez authGuestToken
      accessTokenGuest.value = data.token;
      userGuestId.value = true; // Marquez correctement l'utilisateur comme invité
    } else {
      // Sinon, utilisez authToken pour un utilisateur pleinement authentifié
      accessToken.value = data.token;
      userGuestId.value = false; // Assurez-vous que userGuestId reflète correctement le statut de l'utilisateur
    }
    userId.value = data.id;
    userStore.setUser(data);
  };

  const getAccessToken = () => {
    return accessToken.value || accessTokenGuest.value;
  };

  const login = async (loginData: Login_LoginInput_jsonld) => {
    try {
      const response = await $post("/api/v3/customer/auth/login", {
        body: {
          email: loginData.email,
          password: loginData.password,
        },
      });
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
    const response = await $API.auth.apiCustomerAuthregisterGuestPost(requestBody);
    setUser(response);
    return response;
  };

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
    return accessTokenGuest.value != null;
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
    const response = await axios.get(`https://api.faume.co/api/v3/customer/auth/connect/${provider}/${brandId}/check${window.location.search}`, {
      headers: {
        "X-Brand-Id": clientId,
      },
    });
    const user = response.data;
    authToken.value = user.token;
    userId.value = user.id;
    userStore.setUser(user);
    return user;
  };

  return {
    accessToken,
    accessTokenGuest,
    ssoPreviousRoute,
    getAccessToken,
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
