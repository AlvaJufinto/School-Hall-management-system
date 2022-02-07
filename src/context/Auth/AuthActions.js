import { createContext, useEffect, useReducer } from "react";
// import AuthReducer from ".AuthReducer";

const INITIAL_STATE = {
    display: "hide",    
    user: null,
    isLoggedIn: false,
    isLoading: false,
}

const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer1)

    useEffect(() =>{
        let accessToken = localStorage.getItem("accessToken");
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                display: state.display,
                user: state.user,
                isLoggedIn: state.isLoading,
                isLoading: state.isLoading,
                error: state.error,
                errorMessage: state.errorMessage,
                dispatch
            }}>
            { children }
        </AuthContext.Provider>
    )
}