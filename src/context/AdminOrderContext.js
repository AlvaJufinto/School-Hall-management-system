import { createContext, useEffect, useReducer } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { adminDataApi } from './../api/api';

const INITIAL_STATE = {
    order: null,
    packet: null,
    isLoading: false,
    errorMessage: null,
}

export const AdminOrderContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ADMIN_ORDER_START":
            return {    
                order: null,
                packet: null,
                isLoading: true,
                errorMessage: null,
            };           
        case "FETCH_ADMIN_ORDER_SUCCESS":
            return {
                order: action.payload.order,
                packet: action.payload.paket,
                isLoading: false,
                errorMessage: null,
            }
        case "FETCH_ADMIN_ORDER_FAILURE":
            return {
                order: null,
                packet: null,
                isLoading: false,
                errorMessage: action.payload,
            }
        case "DELETE_ADMIN_ORDER_START":
            return {
                order: state.order,
                packet: state.packet,
                isLoading: true,
                errorMessage: null,
            }
        case "DELETE_ADMIN_ORDER_SUCCESS":
            return {
                order: state.order.filter((item) => item._id !== action.payload),
                packet: state.packet,
                isLoading: false,
                errorMessage: null,
            }
        case "EDIT_ADMIN_ORDER_START":
            return {
                order: state.order,
                packet: state.packet,
                isLoading: true,
                errorMessage: null, 
            }
        case "EDIT_ADMIN_ORDER_SUCCESS":
            return {
                order: action.payload,
                packet: state.packet,
                isLoading: false,
                errorMessage: null, 
            }
        case "EDIT_ADMIN_ORDER_FAILURE":
            return {
                order: state.order,
                packet: state.packet,
                isLoading: false,
                errorMessage: action.payload, 
            }
        case "ADD_ADMIN_PACKET_START":
            return {
                order: state.order,
                packet: state.packet,
                isLoading: true,
                errorMessage: null,
            }
        case "ADD_ADMIN_PACKET_SUCCESS":
            return {
                order: state.order,
                packet: [...state.packet, action.payload],
                isLoading: false,
                errorMessage: null,
            }
        case "ADD_ADMIN_PACKET_FAILURE":
            return {
                order: state.order,
                packet: state.packet,
                isLoading: false,
                errorMessage: action.payload,
            }
        case "DELETE_ADMIN_PACKET_START":
            return {
                order: state.order,
                packet: state.packet,
                isLoading: true,
                errorMessage: null
            }
        case "DELETE_ADMIN_PACKET_SUCCESS":
            return {
                order: state.order,
                packet: state.packet.filter((item) => item._id !== action.payload),
                isLoading: false,
                errorMessage: null, 
            }
        default: 
            return state;
    }
}

export const AdminOrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {   
        (async () => {
            if(accessToken) {
                dispatch({ type: "FETCH_ADMIN_ORDER_START" });
                try {
                    const res = await adminDataApi.allData({ accessToken: accessToken });
                    dispatch({ type: "FETCH_ADMIN_ORDER_SUCCESS", payload: res.data.data });
                } catch (err) {
                    console.log(err.response);
                    dispatch({ type: "FETCH_ADMIN_ORDER_FAILURE", payload: err });
            }
        }
        })();
    }, [refreshToken]);

    return (
        <AdminOrderContext.Provider
            value={{
                order: state.order,
                packet: state.packet,
                isLoading: state.isLoading,
                errorMessage: state.errorMessage,
                dispatch
            }}>
            { children }
        </AdminOrderContext.Provider>
    )
}