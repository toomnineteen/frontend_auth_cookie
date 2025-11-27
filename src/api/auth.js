import axios from "axios";

export const register = async (data) => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
    data,
    { withCredentials: true } // ✅ ต้องมี!
  );
};

export const login = async (data) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, data, {
    withCredentials: true,
  });
};

export const logout = async () => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
};

export const profile = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/me`, {
    withCredentials: true,
  });
};
