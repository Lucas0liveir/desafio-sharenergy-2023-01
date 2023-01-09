import { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import Tabs from "../../components/Tabs";
import { EMAILREGEX } from "../../helpers/regex";
import { authService, LoginBody, RegisterForm } from "../../service/auth.service";
import './styles.css';

export function LoginAndRegister() {

    const [loginForm, setLoginForm] = useState<LoginBody>({
        password: '',
        username: '',
        rememberme: false
    })

    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        password: '',
        username: '',
        email: ''
    })

    useEffect(() => {
        const rememberme = localStorage.getItem("loginForm")

        if (rememberme) {
            setLoginForm(JSON.parse(rememberme))
        }

        return () => { }

    }, [])

    if (authService.restoreSession()) {
        return <Navigate to="/" />
    }

    function handleSetRemember(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = event.target
        setLoginForm((prev) => {
            const newData = { ...prev, [name]: checked }
            return newData
        })
    }

    function handleSetLoginForm(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const { name, value } = event.target

        setLoginForm((prev) => {
            const newData = { ...prev, [name]: value }
            return newData
        })
    }

    function handleSetRegisterForm(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const { name, value } = event.target

        setRegisterForm((prev) => {
            const newData = { ...prev, [name]: value }
            return newData
        })
    }

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (loginForm.password.trim().length < 8) {
            return
        }

        if (loginForm.username.trim().length === 0) {
            return
        }

        try {

            await authService.login(loginForm)

            if (loginForm.rememberme) {
                authService.rememberlogin(loginForm)
            } else {
                localStorage.removeItem("loginForm")
            }

            setLoginForm({
                password: '',
                username: '',
                rememberme: loginForm.rememberme
            })

        } catch (e) {
            console.log(e);
        }

    }

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (registerForm.password.trim().length < 8) {
            return
        }

        if (registerForm.username.trim().length === 0) {
            return
        }

        if (registerForm.email.trim().length === 0 || !EMAILREGEX.test(registerForm.email)) {
            return
        }

        console.log(registerForm.username);

        try {

            await authService.register(registerForm)

            setRegisterForm({
                password: '',
                username: '',
                email: ''
            })
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="loginpage-container">
            <Tabs
                labels={["Login", "Cadastro"]}
            >
                <div className="form-container">
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <input
                                name="username"
                                onChange={handleSetLoginForm}
                                value={loginForm.username}
                                placeholder="username"
                                type={"text"}
                            />
                            <input
                                name="password"
                                onChange={handleSetLoginForm}
                                value={loginForm.password}
                                placeholder="senha"
                                type={"password"}
                            />

                            <div className="check-box">
                                <input
                                    checked={loginForm.rememberme}
                                    value={"remember"}
                                    name="rememberme"
                                    onChange={handleSetRemember}
                                    id="remember"
                                    type="checkbox"
                                />
                                <label
                                    id="remember"
                                >
                                    Lembrar-me
                                </ label>
                            </div>
                        </div>
                        <button type="submit">
                            Entrar
                        </button>
                    </form>
                </div>
                <div>
                    <form onSubmit={handleRegister} className="login-form">
                        <div className="input-group">
                            <input
                                name="username"
                                value={registerForm.username}
                                onChange={handleSetRegisterForm}
                                placeholder="username"
                                type={"text"}
                            />
                            <input
                                name="email"
                                value={registerForm.email}
                                onChange={handleSetRegisterForm}
                                placeholder="email"
                                type={"email"}
                            />
                            <input
                                name="password"
                                value={registerForm.password}
                                onChange={handleSetRegisterForm}
                                placeholder="senha"
                                type={"password"}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </Tabs>
        </div>
    )
}