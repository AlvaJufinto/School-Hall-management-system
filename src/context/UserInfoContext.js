import { createContext, useEffect, useReducer } from "react";
import { clientDataApi } from "./../api/api";

const INITIAL_STATE = {
    packet: null,
    order: null,
    isLoading: false,
    errorMessage: null,
}

export const UserInfoContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_USER_INFO_START":
            return {
                packet: null,
                order: null,
                isLoading: true,
                errorMessage: null,
            };
        case "FETCH_USER_INFO_SUCCESS":
            return {
                packet: action.payload.paket,
                order: action.payload.order,
                isLoading: false,
                errorMessage: null,
            }
        case "FETCH_USER_INFO_FAILURE":
            return {
                packet: null,
                order: null,
                isLoading: false,
                errorMessage: action.payload,
            }
        default: 
            return state;
    }
}

export const UserInfoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    // useEffect(() => {
    //     (async () => {
    //         dispatch({ type: "FETCH_USER_INFO_START" });
    //         try {
    //             const res = await clientDataApi.all();
    //             dispatch({ type: "FETCH_USER_INFO_SUCCESS", payload: res.data.data });
    //         } catch (err) {
    //             // console.log(err);
    //             dispatch({ type: "FETCH_USER_INFO_FAILURE", payload: err });
    //         }
    //     })();
    // }, [state.packet, state.order]);
    
    return (
        <UserInfoContext.Provider
            value={{
                packet: state.packet,
                order: state.order,
                isLoading: state.isLoading,
                errorMessage: state.errorMessage,
            }}>
            { children }
        </UserInfoContext.Provider>
    )
}