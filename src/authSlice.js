import { createSlice } from "@reduxjs/toolkit";

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const readString = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const saveSession = (user, token) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } catch {
    /* ignore storage errors */
  }
};

const clearSession = () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch {
    /* ignore storage errors */
  }
};

const savedUser = readJson("user", null);
const savedToken = readString("token", null);

const initialState = {
  isAuthenticated: !!savedUser && !!savedToken,
  user: savedUser,
  token: savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      saveSession(user, token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearSession();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
