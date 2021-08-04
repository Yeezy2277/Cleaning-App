import React, {createContext, useReducer} from 'react';
import {initialState, reducer} from "../store/reducer";

export const UserContext = createContext([{
    state: initialState,
    dispatch: () => null
}, p => {}])

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={[ state, dispatch ]}>
            { children }
        </UserContext.Provider>
    );
};

export default UserProvider;