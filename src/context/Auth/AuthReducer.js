const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                display: "hide",
                user: null,
                isLoggedIn: false,
                isLoading: true,
                isError: false,
                errorMessage: null,
            };
        case "LOGIN_SUCCESS":
            return {
                display: "show",
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
                isError: false,
                errorMessage: null,
            }
        case "LOGIN_FAILURE":
            return {
                display: "hide",
                user: null,
                isLoggedIn: false,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            }
        case "LOGOUT":
            return {
                display: "hide",
                user: null,
                isLoggedIn: false,
                isLoading: false,
                isError: false,
                errorMessage: null,
            }
        default: 
            return state;
    }
}