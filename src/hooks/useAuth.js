import axios from "axios";
import { createContext, useContext, useState } from "react";
import axiosJWT from "../utils/axiosJWT";

const authContext = createContext();

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
    signOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
