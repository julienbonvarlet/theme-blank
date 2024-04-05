export function useAuthUser() {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  const getUser = () => {
    if (authStore.authToken && !userStore.user) {
      userStore.fetchCurrentUser();
    }
  };

  return {
    getUser,
  };
}
