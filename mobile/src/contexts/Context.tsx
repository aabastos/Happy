import React, { createContext, useState } from 'react';

const Context = createContext({
    selectMapHeaderVisible: false,
    setMapHeaderVisibility: (visibility) => { }
});

interface Props {
    children: JSX.Element
}

function ContextProvider(props: Props) {
    const [selectMapHeaderVisible, setSelectMapHeaderVisible] = useState(false);

    function setMapHeaderVisibility(visibility: boolean) {
        setSelectMapHeaderVisible(visibility);
    }

    return (
        <Context.Provider value={{ selectMapHeaderVisible, setMapHeaderVisibility }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }