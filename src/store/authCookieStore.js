import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { logout } from "../api/auth";

const authCookieStore = (set) => ({
  user: null,
  token: null,

  actionLogout: async () => {
    try {
      const response = await logout();
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
      });
      return response;
    } catch (err) {
      console.error("Logout failed:", err);
    }
  },

  actionLogin: async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
      data
    );
    set({
      user: response.data.user,
      token: response.data.token,
    });
    return response;
  },
});

const usePersist = {
  name: "auth_cookie",
  storage: createJSONStorage(() => localStorage),
};

const useAuthCookie = create(persist(authCookieStore, usePersist));

export default useAuthCookie;
