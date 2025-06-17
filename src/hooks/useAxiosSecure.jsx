import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  // instercept request
  axiosInstance.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axiosInstance;
};

export default useAxiosSecure;
