import { useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export function useAuth() {
  const { user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore();

  const login = useCallback(
    async (payload: LoginPayload) => {
      const data = await api.post<AuthResponse>("/auth/login", payload);
      setAuth(data.user, data.token);
      return data.user;
    },
    [setAuth]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const data = await api.post<AuthResponse>("/auth/register", payload);
      setAuth(data.user, data.token);
      return data.user;
    },
    [setAuth]
  );

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
