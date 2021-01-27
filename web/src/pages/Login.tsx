import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../contexts/AuthContext';

import DashboardLanding from '../components/DashboardLanding';
import DashboardBackButton from '../components/DashboardBackButton';

import '../styles/pages/login.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';
import { AxiosError, AxiosResponse } from 'axios';

function Login() {
    const { authenticate, authenticated } = useContext(Context);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(evt: FormEvent) {
        evt.preventDefault();

        api.post('authenticate', {
            email: email,
            password: password
        }).then(
            (response: AxiosResponse) => {
                const { token } = response.data;
                localStorage.setItem("TOKEN", token);
                api.defaults.headers.authorization = `Bearer ${token}`;

                authenticate(true);

                history.push("/dashboard");
            },
            (error: AxiosError) => {
                alert(error.response?.data.message);
            }
        )
    }

    useEffect(() => {
        if (authenticated) {
            history.replace("/dashboard");
        }
    }, [authenticated]);

    return (
        <div id="login-page">
            <DashboardBackButton to="/" />
            <DashboardLanding />

            <div className="login-inputs">
                <form onSubmit={handleLogin}>
                    <fieldset>
                        <legend>Fazer login</legend>
                        <div className="input-block">
                            <label htmlFor="name">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(evt) => setPassword(evt.target.value)}
                            />
                        </div>
                        <div>
                            <div className="checkbox">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Lembrar-me</label>
                            </div>

                            <Link to="/forgot-password">Esqueci minha senha</Link>
                        </div>
                    </fieldset>

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;