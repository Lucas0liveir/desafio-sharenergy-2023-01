import { useEffect, useState } from "react";
import { authService, LoginBody, RegisterForm } from "../../service/auth.service";
import { Navigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import Tabs from "../../components/Tabs";
import { EMAILREGEX } from "../../helpers/regex";
import './styles.css';

export function LoginAndRegister() {

    const [loading, setLoading] = useState(false)
    const [passError, setPassError] = useState('')
    const [passRegisterError, setPassRegisterError] = useState('')
    const [userNameRegisterError, setRegisterUserNameErros] = useState('')
    const [erros, setAllErrors] = useState('')
    const [errosRegister, setAllErrorsRegisters] = useState('')
    const [successRegister, setSuccessRegister] = useState('')
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

        if (erros || passError) {
            setAllErrors('')
            setPassError('')
        }

        if (loginForm.password.trim().length < 8) {
            setPassError("sua senha precisa ter pelo menos 8 caracteres")
            return
        }

        if (loginForm.username.trim().length === 0) {
            return
        }

        try {
            setLoading(true)
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
            console.log(e)
            setAllErrors("verifique se seu username ou senha estão corretos")
        } finally {
            setLoading(false)
        }

    }

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (passRegisterError || errosRegister || userNameRegisterError) {
            setPassRegisterError("")
            setAllErrorsRegisters("")
            setRegisterUserNameErros("")
        }

        if (registerForm.username.trim().length === 0) {
            setRegisterUserNameErros("informe um nome de usuário")
            return
        }

        if (registerForm.username.trim().length === 0) {
            setRegisterUserNameErros("informe um nome de usuário")
            return
        }

        if (registerForm.password.trim().length < 8) {
            setPassRegisterError("Sua senha precisa ter pelo menos 8 caracteres")
            return
        }

        if (registerForm.email.trim().length === 0 || !EMAILREGEX.test(registerForm.email)) {
            return
        }

        try {
            setLoading(true)
            await authService.register(registerForm)

            setSuccessRegister("Cadastrado com sucesso!")
            setRegisterForm({
                password: '',
                username: '',
                email: ''
            })
            setTimeout(() => {
                setSuccessRegister("")
            }, 5000)
        } catch (e: any) {
            console.log(e);
            setAllErrorsRegisters(e.response.data.message)
        } finally {
            setLoading(false)
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
                                disabled={loading}
                                name="username"
                                onChange={handleSetLoginForm}
                                value={loginForm.username}
                                placeholder="username"
                                type={"text"}
                            />
                            <input
                                disabled={loading}
                                name="password"
                                onChange={handleSetLoginForm}
                                value={loginForm.password}
                                placeholder="senha"
                                type={"password"}
                            />
                            {passError.length > 1 ? (
                                <p style={{ color: "red" }}>{passError}</p>
                            ) : null
                            }

                            <div className="check-box">
                                <input
                                    disabled={loading}
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
                        <button disabled={loading} type="submit">
                            {loading ? (
                                <Spinner />
                            ) : "Entrar"}
                        </button>
                        {erros.length > 1 ? (
                            <p style={{ color: "red" }}>{erros}</p>
                        ) : null}
                    </form>
                </div>
                <div>
                    <form onSubmit={handleRegister} className="login-form">
                        {successRegister.length > 1 ? (
                            <p style={{ color: "green" }}>{successRegister}</p>
                        ) : null}
                        <div className="input-group">
                            <input
                                disabled={loading}
                                name="username"
                                value={registerForm.username}
                                onChange={handleSetRegisterForm}
                                placeholder="username"
                                type={"text"}
                            />
                            {userNameRegisterError.length > 1 ? (
                                <p style={{ color: "red", padding: 0, margin: 0 }}>{userNameRegisterError}</p>
                            ) : null
                            }
                            <input
                                disabled={loading}
                                name="email"
                                value={registerForm.email}
                                onChange={handleSetRegisterForm}
                                placeholder="email"
                                type={"email"}
                            />
                            <input
                                disabled={loading}
                                name="password"
                                value={registerForm.password}
                                onChange={handleSetRegisterForm}
                                placeholder="senha"
                                type={"password"}
                            />
                            {passRegisterError.length >= 1 ? (
                                <p style={{ color: "red" }}>{passRegisterError}</p>
                            ) : null
                            }
                            <button disabled={loading} type="submit">
                                {loading ? (
                                    <Spinner />
                                ) : "Cadastrar"}
                            </button>
                            {errosRegister.length > 1 ? (
                                <p style={{ color: "red" }}>{errosRegister}</p>
                            ) : null}
                        </div>
                    </form>
                </div>
            </Tabs>
        </div>

    )
}