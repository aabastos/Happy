import React from 'react';

import DashboardLanding from '../components/DashboardLanding';

import '../styles/pages/newPassword.css';

function NewPassword() {
    return (
        <div id="new-password-page">
            <DashboardLanding />

            <div className="new-password-inputs">
                <form>
                    <fieldset>
                        <legend>
                            Redefinição de senha
                            <p>Escolha uma nova senha para você acessar o dashboard do happy.</p>
                        </legend>
                        <div className="input-block">
                            <label htmlFor="newPassword">Nova senha</label>
                            <input
                                type="password"
                                id="newPassword"
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="newPasswordConfirmation">Repetir senha</label>
                            <input
                                type="password"
                                id="newPasswordConfirmation"
                            />
                        </div>
                    </fieldset>

                    <button type="submit" >Redefinir</button>
                </form>
            </div>
        </div>
    )
}

export default NewPassword;