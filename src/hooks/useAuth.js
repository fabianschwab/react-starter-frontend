import axios from "axios";
import { createContext, useContext, useState } from "react";
import axiosJWT from "../utils/axiosJWT";

const AuthContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    try {
      const response = await axios.post("/signin", credentials);

      setUser({ username: response.data.username });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return { auth: true };
    } catch (error) {
      console.error(error);

      return { auth: false, msg: error.response.data.message };
    }
  };

  const signUp = async (credentials) => {
    try {
      await axios.post("/signUp", credentials);

      return { auth: true };
    } catch (error) {
      console.error(error);

      return { auth: false, msg: error.response.data.message };
    }
  };

  const signOut = async () => {
    try {
      const response = await axiosJWT.get("/signout");

      setUser(null);

      localStorage.removeItem("accessToken", response.data.accessToken);
      localStorage.removeItem("refreshToken", response.data.refreshToken);

      return { auth: false };
    } catch (error) {
      console.error(error);

      return { auth: true, msg: error.response.data.message };
    }
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
