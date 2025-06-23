import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

app.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalConfig = err.config as CustomAxiosRequestConfig;
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
          { withCredentials: true }
        );
        if (data) return app(originalConfig as AxiosRequestConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
};

export default http;
