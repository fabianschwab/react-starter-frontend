import axios from "axios";
import jwtDecode from "jwt-decode";

const axiosJWT = axios.create();

// axiosJWT.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const refresh = async () => {
  try {
    const response = await axios.post("/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (error) {
    console.error(error);
  }
};

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwtDecode(localStorage.getItem("accessToken"));
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      await refresh();
    }
    config.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
