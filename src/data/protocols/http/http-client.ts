import { AxiosRequestConfig } from "axios";

export interface HttpClient {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any, B = any>(url: string, body: B, config?: AxiosRequestConfig): Promise<T>;
  delete(url: string, id: string, config?: AxiosRequestConfig): Promise<boolean>;
  patch<T = any, B = any>(url: string, body: B, config?: AxiosRequestConfig): Promise<T>;
}
