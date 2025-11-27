import axios from "axios";

export const register = async (data) => {return axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, data)};

export const login = async (data) => {return axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, data)};

export const profile = async (token) => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
