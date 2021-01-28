import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import successImg from '../images/success.svg';

import '../styles/pages/success.css'

export default function Success() {
    const location = useLocation();
    const { goBack } = useHistory();

    const [text, setText] = useState('aaaaaaaaaaaaaaa');
    const [buttonText, setButtonText] = useState('aaaaaaaaaaaaaaaaaaaaa');

    useEffect(() => {
        switch (location.pathname) {
            case '/create-success':
                setText('O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)');
                setButtonText('Voltar para o mapa');
                break;
        }
    }, [location.pathname])

    return (
        <div id="success-page">
            <main>
                <h1>Ebaaa!</h1>
                <p>{text}</p>
                <button onClick={goBack}>{buttonText}</button>
            </main>

            <img src={successImg} alt="Sucesso" />
        </div>
    )
}