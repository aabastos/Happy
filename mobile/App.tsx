import React from 'react';

import { ContextProvider } from './src/contexts/Context';
import Routes from './src/routes';

export default function App() {
    return (
        <ContextProvider>
            <Routes />
        </ContextProvider>
    );
}
