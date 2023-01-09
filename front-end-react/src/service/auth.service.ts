import { map } from "rxjs";
import IHttpRequest from "../adapters/httpRequest/IHttpRequest.adapter";

import { httpRequest } from "./httpRequestDefault";

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export interface LoginBody {
    username: string;
    password: string;
    rememberme?: boolean
}

interface LoginResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}

class AuthService {

    constructor(
        private readonly httpRequest: IHttpRequest
    ) { }

    async login({ password, username }: LoginBody) {

        try {
            const { data } = await this.httpRequest.post<LoginResponse, LoginBody>
                ("/accounts/auth/login", { username, password })

            this.httpRequest.setToken(data.access_token)
            this.setLocalStorageAccessToken(data.access_token)
            this.setLocalStorageRefreshToken(data.refresh_token)
            this.setUser(data.user)
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async register(form: RegisterForm) {
        return await this.httpRequest.post<{}>('/accounts/create', form)
    }

    logout() {
        this.httpRequest.setToken("")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
    }

    setLocalStorageAccessToken(token: string) {
        localStorage.setItem("access_token", token)
    }

    setLocalStorageRefreshToken(token: string) {
        localStorage.setItem("refresh_token", token)
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    rememberlogin(loginBody: LoginBody) {
        localStorage.setItem('loginForm', JSON.stringify(loginBody))
    }

    restoreSession(): boolean {

        if (httpRequest.isAuthenticated()) {
            return true;
        }

        const token = localStorage.getItem('access_token')

        if (!token) {
            return false;
        }

        const user = JSON.parse(localStorage.getItem('user') ?? '{}')

        if (!user) {
            return false;
        }

        httpRequest.setToken(token)

        this.setUser(user)

        return true;
    }
}

export const authService = new AuthService(httpRequest)