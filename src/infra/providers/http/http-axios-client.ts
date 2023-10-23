import { HttpClient } from '@/data/protocols/http/http-client';
import axios, { AxiosRequestConfig } from 'axios';

export class HttpAxiosClient implements HttpClient {
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const http = await axios.get(url, config);
    return http.data;
  }

  async post<T = any, B = any>(url: string, body: B, config?: AxiosRequestConfig): Promise<T> {
    const result = await axios.post(url, body, config);
    return result.data;
  }

  async delete(url: string, id: string, config?: AxiosRequestConfig): Promise<boolean> {
    try {
      const result = await axios.delete(`${url}&records[]=${id}`, config);
      return result.data.records[0].deleted;
    } catch {
      return false;
    }
  }

  async patch<T = any, B = any>(url: string, body: B, config?: AxiosRequestConfig): Promise<T> {
    const result = await axios.patch(url, body, config);
    return result.data;
  }
}
