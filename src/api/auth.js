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
  try {
    return await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
};

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
