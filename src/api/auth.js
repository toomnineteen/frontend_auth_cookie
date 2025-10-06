import axios from "axios";

export const register = async (data) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`, data);
};

export const login = async (data) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, data, {
    withCredentials: true,
  });
};

export const logout = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/api/logout`, {
    withCredentials: true,
  });
};

export const profile = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`, {
    withCredentials: true,
  });
};

export const read_users = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/api/read`, {
    withCredentials: true,
  });
};

export const current_user = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`, {
    withCredentials: true,
  });
};
