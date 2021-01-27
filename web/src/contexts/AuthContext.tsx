import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';

const Context = createContext({
    authenticated: false,
    authenticate: (state: boolean) => { }
});

interface Props {
    children: JSX.Element
}
function AuthProvider(props: Props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    function authenticate(state: boolean) {
        setAuthenticated(state);
    }

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');

        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    return (
        <Context.Provider value={{ authenticated, authenticate }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };