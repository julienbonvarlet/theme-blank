import {
  OAuth2Connect_Customer_jsonld,
  type EnableAccount_EnableAccountInput_jsonld,
  type GuestLogin_GuestLoginInput_jsonld,
  type GuestLogin_jsonld_guest_login_read,
  type Login_Customer_jsonld,
  type Login_LoginInput_jsonld,
  type Register_Customer_jsonld,
  type Register_RegisterGuestInput_jsonld,
  type Register_RegisterInput_jsonld,
} from "@faume-tech/sdk-recommerce";
import type { RouteRecordName } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const route = useRoute();
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const clientId = config.public.clientId;
  const { $get, $post } = useNuxtApp();

  const accessToken = useCookie<string | null>("access_token");
  const accessTokenGuest = useCookie<string | null>("access_token_guest");
  const ssoPreviousRoute = useCookie<RouteRecordName | null | undefined>("sso-previous-route");

  const userId = ref(null);
  const userGuestId = ref(false);

  const setUser = (data: Login_Customer_jsonld, isGuest = false) => {
    if (isGuest) {
      accessTokenGuest.value = data.token as string;
    } else {
      accessToken.value = data.token as string;
    }
    userStore.setUser(data);
  };

  const getAccessToken = () => {
    return accessToken.value || accessTokenGuest.value;
  };

  const login = async (loginData: Login_LoginInput_jsonld) => {
    try {
      const response = await $post<Login_Customer_jsonld>("/api/v3/customer/auth/login", {
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

  const register = async (registerData: Register_RegisterInput_jsonld) => {
    const response = await $post<Register_Customer_jsonld>("/api/v3/customer/auth/register", {
      body: {
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
      },
    });
    setUser(response);

    return response;
  };

  const registerAsGuest = async (data: Register_RegisterGuestInput_jsonld) => {
    const response = await $post<Register_Customer_jsonld>("/api/v3/customer/auth/register-guest", {
      body: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        countryCode: data.countryCode || "FRA",
        locale: data.locale || "fr_FR",
      },
    });
    setUser(response, true);

    return response;
  };

  const guestLogin = async (orderReference: GuestLogin_GuestLoginInput_jsonld) => {
    const response = await $post<GuestLogin_jsonld_guest_login_read>("/api/v3/customer/auth/guest-login", { body: orderReference });
    userGuestId.value = true;
    setUser(response, true);

    return response;
  };

  const checkEmailExists = async (email: string) => {
    const res = await $post("/api/v3/customer/auth/check-email", { body: { email } });

    return !!res;
  };

  const enableAccount = async (data: EnableAccount_EnableAccountInput_jsonld) => {
    return await $post("/api/v3/customer/auth/enable-account", { body: data });
  };

  const logout = () => {
    userStore.setUser(null);
    accessToken.value = null;
  };

  const isAuthenticated = () => {
    return accessToken.value != null;
  };

  const guestIsAuthenticated = () => {
    return accessTokenGuest.value != null;
  };

  const connectSSO = (provider: "facebook" | "google" = "facebook") => {
    ssoPreviousRoute.value = route.name;
    navigateTo(`https://api.faume.co/api/v3/customer/auth/connect/${provider}?brand=${clientId}`);
  };

  const getUserFromSSO = async (provider: "facebook" | "google", brandId: string) => {
    const response = await $get<OAuth2Connect_Customer_jsonld>(`/api/v3/customer/auth/connect/${provider}/${brandId}/check${window.location.search}`);
    const user = response.data;
    accessToken.value = user.token;
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
