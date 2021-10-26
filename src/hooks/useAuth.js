import axios from "axios";
import { createContext, useContext, useState } from "react";

const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    try {
      const result = await axios.post("/signin", credentials);
      setUser(result.data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

return {
  user,
  signIn,
};
