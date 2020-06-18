// @ts-nocheck
import React, {createContext, useReducer} from 'react';

export const initialState: any = {
};

const store = createContext(initialState);
const Provider = store.Provider;

const StateProvider = (props:any ) => {
    const [state, dispatch] = useReducer((state:any, action:any) => {

        switch(action.type) {
            case 'nocase':
                return Object.assign({});
            default:
                throw new Error();
        };
    }, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {props.children}
        </Provider>
    );
};

export { store, StateProvider }