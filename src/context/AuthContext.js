import { createContext, useEffect, useReducer } from "react";
import { authApi } from "./../api/api";

const INITIAL_STATE = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    errorMessage: null,
    pendingTokenCheck: true,
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
                pendingTokenCheck: true,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
                errorMessage: null,
                pendingTokenCheck: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isLoggedIn: false,
                isLoading: false,
                errorMessage: action.payload,
                pendingTokenCheck: false
            }
        case "LOGOUT_START":
            return {
                user: action.payload,
                isLoggedIn: true,
                isLoading: true,
                errorMessage: null,
                pendingTokenCheck: false,
            }
        case "LOGOUT_SUCCESS":
            return {
                user: null,
                isLoggedIn: false,
                isLoading: false,
                errorMessage: null,
                pendingTokenCheck: false
            }
        default: 
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    let refreshToken = localStorage.getItem("refreshToken");
    let accessToken = localStorage.getItem("accessToken");
    
    useEffect(() => {
        (async () => {
            // dispatch({ type: "LOGIN_START" });
            if (refreshToken) {
                try {
                    const res = await authApi.loggedIn({ refreshToken: refreshToken});
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

                    // console.log(res)
                } catch (err) {
                    console.error(err);
                }
            }
        })();
    }, [refreshToken, accessToken]);
    
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                isLoading: state.isLoading,
                errorMessage: state.errorMessage,
                pendingTokenCheck: state.pendingTokenCheck,
                dispatch
            }}>
            { children }
        </AuthContext.Provider>
    )
}