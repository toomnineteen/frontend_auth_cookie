import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const authCookieStore = (set) => ({
  user: null,
  token: null,

  actionLogout: async () => {
    try {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
      });
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
