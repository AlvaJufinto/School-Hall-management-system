import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

import api from "./../../api/auth";

const INITIAL_STATE = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    errorMessage: null,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    let refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        (async () => {
            if (refreshToken) {
                try {
                    const res = await api.loggedIn({ refreshToken: refreshToken});
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

                    console.log(res.data)
                } catch (err) {
                    console.error(err);
                }
            }
            })();
    }, [refreshToken]);
    
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                isLoading: state.isLoading,
                errorMessage: state.errorMessage,
                dispatch
            }}>
            { children }
        </AuthContext.Provider>
    )
}