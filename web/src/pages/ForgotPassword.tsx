import React from 'react';

import DashboardLanding from '../components/DashboardLanding';
import DashboardBackButton from '../components/DashboardBackButton';

import '../styles/pages/forgotPassword.css';

function ForgotPassword() {
    return (
        <div id="forgot-password-page" >
            <DashboardBackButton to="/login" />
            <DashboardLanding />

            <div className="email-input">
                <form>
                    <fieldset>
                        <legend>
                            Esqueci a senha
                            <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
                        </legend>
                        <div className="input-block">
                            <label htmlFor="name">Email</label>
                            <input
                                type="email"
                                id="email"
                            />
                        </div>
                    </fieldset>

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;