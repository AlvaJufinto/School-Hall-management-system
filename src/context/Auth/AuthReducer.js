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
        case "LOGOUT":
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

export default AuthReducer;