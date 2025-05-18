import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Başlangıç state'ini localStorage'dan token varsa doldur
const getInitialState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // BURASI ÖNEMLİ: saniye cinsinden

      if (decoded.exp && decoded.exp > currentTime) {
        return {
          user: decoded,
          isAuthChecked: true,
        };
      } else {
        localStorage.removeItem("token");
        return {
          user: null,
          isAuthChecked: true,
        };
      }
    } catch (e) {
      localStorage.removeItem("token");
      return {
        user: null,
        isAuthChecked: true,
      };
    }
  }

  return {
    user: null,
    isAuthChecked: true,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    // Token'dan user'ı ayarla ve localStorage'a kaydet
    setUserFromToken: (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      localStorage.setItem("token", action.payload.token); // Token'ı localStorage'a yaz
    },
    // Logout işlemi
    logoutUser: (state) => {
      state.user = null;
      state.isAuthChecked = true;
      localStorage.removeItem("token");
    },
    // Auth kontrolünü tamamla (token yoksa bile)
    markAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    // Token'ı doğrudan set etmek için (login sonrası)
    setToken: (state, action) => {
      const decoded = jwtDecode(action.payload);
      state.user = decoded;
      state.isAuthChecked = true;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { setUserFromToken, logoutUser, markAuthChecked, setToken } =
  authSlice.actions;
export default authSlice.reducer;
