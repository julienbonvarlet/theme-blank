export function useAuthUser() {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  const getUser = () => {
    if (authStore.accessToken && !userStore.user) {
      userStore.fetchCurrentUser();
    }
  };

  return {
    getUser,
  };
}
