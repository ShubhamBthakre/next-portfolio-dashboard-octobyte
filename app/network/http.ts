import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await instance.get<T>(url, config);
  return response.data;
}

export async function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await instance.post<T>(url, data, config);
  return response.data;
}

export async function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await instance.put<T>(url, data, config);
  return response.data;
}

export async function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await instance.delete<T>(url, config);
  return response.data;
}

export { instance as httpClient };
