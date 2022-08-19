export interface HttpClient {
  get<T = any>(url: string): Promise<T>;
  post<T = any, B = any>(url: string, body: B): Promise<T>;
  delete(url: string, id: string): Promise<boolean>;
  patch<T = any, B = any>(url: string, body: B): Promise<T>;
}
