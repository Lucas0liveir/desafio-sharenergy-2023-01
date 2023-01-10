import axios, { AxiosInstance } from 'axios';
import IHttpRequest from './IHttpRequest.adapter';

export default class AxiosAdapter implements IHttpRequest {
    private httpRequest: AxiosInstance;

    constructor(baseURL: string) {
        this.httpRequest = axios.create({
            baseURL
        });

        this.httpRequest.interceptors.response.use((response) => response,
            async err => {
                if (err.response) {
                    const { status, data } = err.response

                    switch (status) {
                        case 401:
                            if (data.message === "token_expired") {
                                try {
                                    await this.refreshToken()

                                    const config = err.config

                                    return this.httpRequest({ method: config.method, url: config.url, data: config.data })
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        default:
                            return Promise.reject(err)
                    }
                } else if (err.request) {
                    return Promise.reject(err)
                } else {
                    return Promise.reject(err)
                }
            })
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

    async refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token')
        this.setToken(refreshToken!)

        const { data } = await this.httpRequest
            .post<{
                accessToken: string,
                refreshToken: string
            }>('/accounts/auth/refresh-token')

        const { accessToken, refreshToken: newRefreshToken } = data

        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', newRefreshToken);
        this.setToken(accessToken);
    }

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