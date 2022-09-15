import axios from "axios";

// export const baseUrl = "https://sewa-aula-server.herokuapp.com"; 
export const baseUrl = "http://localhost:8800/"; 

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["x-auth-token"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
    );
    
    //response interceptor to refresh token on receiving token expired error
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            const originalRequest = error.config;
            let refreshToken = localStorage.getItem("refreshToken");
            
            if (
                refreshToken &&
                error.response.status === 401 &&
                !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    return axios
        .post(`${baseUrl}/auth/refreshToken`, { refreshToken: refreshToken })
        .then((res) => {
            if (res.status === 200) {
                localStorage.setItem("accessToken", res.data.accessToken);
                return axios(originalRequest);
            }
        });
    }
    return Promise.reject(error);
}
);