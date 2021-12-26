import axios from "axios";
import { createContext, useContext, useState } from "react";
import axiosJWT from "../utils/axiosJWT";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    try {
      const response = await axios.post("/signin", credentials);

      setUser({ ...response.data.user });

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

  const signOut = async (to) => {
    let message = "SignOut successful.";
    try {
      await axiosJWT.get("/signout");
    } catch (error) {
      console.error(error);
      message = "Error during sign out process. Session already expired.";
    } finally {
      setUser(null);
      localStorage.clear();
    }
    return { auth: false, msg: message };
  };

  const isAuth = () => {
    // When refreshToken is expired, user is no longer authenticated
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const currentDate = new Date();
      const decodedToken = jwtDecode(refreshToken);
      if (decodedToken.exp * 1000 > currentDate.getTime()) {
        return true;
      }
    }
    localStorage.clear();
    return false;
  };

  // TODO: function to get user information if user is empty

  return {
    isAuth,
    signIn,
    signUp,
    signOut,
    user,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
