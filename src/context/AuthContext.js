import { createContext, useEffect, useReducer } from "react";
import authApi from "./../api/auth";

const INITIAL_STATE = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    errorMessage: null,
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isLoggedIn: false,
                isLoading: true,
                errorMessage: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
                errorMessage: null,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isLoggedIn: false,
                isLoading: false,
                errorMessage: action.payload,
            }
        case "LOGOUT_START":
            return {
                user: action.payload,
                isLoggedIn: true,
                isLoading: true,
                errorMessage: null,
            }
        case "LOGOUT_SUCCESS":
            return {
                user: null,
                isLoggedIn: false,
                isLoading: false,
                errorMessage: null,
            }
        default: 
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    let refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        (async () => {
            if (refreshToken) {
                try {
                    const res = await authApi.loggedIn({ refreshToken: refreshToken});
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