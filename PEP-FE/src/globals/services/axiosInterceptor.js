import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  // baseURL: "http://3.140.242.132:8000/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("users/token")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      return axiosInstance.post("users/token", { refreshToken }).then((res) => {
        if (res.status === 201) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          originalRequest.headers["Authorization"] =
            "Bearer " + localStorage.getItem("accessToken");
          localStorage.getItem("accessToken");
          return axios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
