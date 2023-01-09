import { AxiosResponse } from "axios";

export default interface IHttpRequest {
  post<TResponse, TBody = any>(
    url: string,
    body?: TBody,
    headers?: any,
  ): Promise<AxiosResponse<TResponse, any>>;
  put<TResponse, TBody = any>(
    url: string,
    body?: TBody,
  ): Promise<AxiosResponse<TResponse, any>>;
  get<TResponse>(url: string): Promise<AxiosResponse<TResponse, any>>;
  delete<TResponse>(url: string): Promise<AxiosResponse<TResponse, any>>;
  setToken(token: string): void;
  isAuthenticated(): boolean;
}