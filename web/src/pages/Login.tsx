import React from 'react';

import DashboardLanding from '../components/DashboardLanding';
import DashboardBackButton from '../components/DashboardBackButton';

import '../styles/pages/login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div id="login-page">
            <DashboardBackButton to="/" />
            <DashboardLanding />

            <div className="login-inputs">
                <form>
                    <fieldset>
                        <legend>Fazer login</legend>
                        <div className="input-block">
                            <label htmlFor="name">Email</label>
                            <input
                                type="email"
                                id="email"
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Senha</label>
                            <input
                                type="password"
                                id="password"
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

                    <button type="submit" >Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;