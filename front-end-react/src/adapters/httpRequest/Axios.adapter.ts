import axios, { AxiosInstance } from 'axios';
import IHttpRequest from './IHttpRequest.adapter';

export default class AxiosAdapter implements IHttpRequest {
    private httpRequest: AxiosInstance;

    constructor(baseURL: string) {
        this.httpRequest = axios.create({
            baseURL
        });
    }

    isAuthenticated(): boolean {
        return !!this.httpRequest.defaults.headers.common.Authorization;
    }

    setToken(token: string): void {
        if (token) {
            this.httpRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
            return;
        }

        this.httpRequest.defaults.headers.common.Authorization = '';
    }

    // onError(error: any) {
    //     if (error?.response?.status === 401 && error?.response?.data.message === 'token_expired') {
    //         const refreshToken = localStorage.getItem('refresh_token');
    //         this.httpRequest
    //             .post<{
    //                 accessToken: string,
    //                 refreshToken: string
    //             }>('/accounts/auth/refresh-token', { refresh_token: refreshToken })
    //             .pipe(map(response => {
    //                 const newToken = response.data.accessToken;
    //                 const newRefreshToken = response.data.refreshToken;

    //                 this.setToken(newToken);

    //                 localStorage.setItem('access_token', newToken);
    //                 localStorage.setItem('refresh_token', newRefreshToken);

    //                 return this.httpRequest.post(error.config.url, error.config.data);
    //             }));
    //     }

    //     if (error?.response?.data) {
    //         return throwError(() => error.response.data);
    //     }
    //     return throwError(() => error);
    // }

    async post<TResponse, TBody>(url: string, data?: TBody, headers?: any) {
        return await this.httpRequest.post<TResponse>(url, data, { headers })

    }

    async put<TResponse, TBody>(url: string, data?: TBody) {
        return await this.httpRequest.put<TResponse>(url, data)
    }

    async get<T>(url: string) {
        return await this.httpRequest.get<T>(url)
    }

    async delete<TResponse>(url: string) {
        return await this.httpRequest.delete<TResponse>(url)
    }

}