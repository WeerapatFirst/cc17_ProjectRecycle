import axios from "axios";

import { getAccessToken, removeAccessToken } from "../utils/local-storage";

import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// ดักจับ
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config; // axios(config)
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (value) => Promise.resolve(value),
  (error) => {
    if (error.response.status === 401) {
      removeAccessToken();
      toast.error("กรุณาล็อกอินก่อนเข้าถึงหน้านี้");
      // alert("กรุณาล็อกอินก่อนเข้าถึงหน้านี้");
      window.location.assign("/");
      // return;
    } else if (error.response.status === 403) {
      toast.error("ไม่สามารถเข้าถึงได้");
      // alert("ไม่สามารถเข้าถึงได้");
      window.location.assign("/");
    }
    return Promise.reject(error);
  }
);

export default axios;
