import api from "../api/axios";

export const login = async (username, password) => {
  const response = await api.post("login/", {
    username,
    password,
  });

  // Token/username persistence is handled by AuthContext.loginUser so it
  // lives in one place instead of being duplicated here and in the context.
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post("register/", {
    username,
    email,
    password,
  });

  return response.data;
};
