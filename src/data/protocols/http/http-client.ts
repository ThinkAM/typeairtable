export interface HttpClient {
  get<T = any, B = any>(url: string, headers?: B | { [header: string]: string | string[] }): Promise<T>;
  post<T = any, B = any, C = any>(url: string, body: B, headers?: C | { [header: string]: string | string[] }): Promise<T>;
  delete<T = any>(url: string, id: string, headers?: T | { [header: string]: string | string[] }): Promise<boolean>;
  patch<T = any, B = any, C = any>(url: string, body: B, headers?: C | { [header: string]: string | string[] }): Promise<T>;
}
