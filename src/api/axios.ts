import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Incluir credenciales en las peticiones
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Puedes agregar headers adicionales aquí si es necesario
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    // Extraer el mensaje de error del backend y lanzarlo
    const errorMessage = error.response?.data?.error ?? "Error en la petición";
    return Promise.reject(new Error(errorMessage));
  },
);

export const get = async (
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return axiosInstance.get(url, config);
};

export const post = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return axiosInstance.post(url, data, config);
};

export default axiosInstance;
