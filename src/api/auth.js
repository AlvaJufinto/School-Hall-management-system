import axios from "axios";

//functions to make auth calls
const api = {
  // signup: (body) => {
  //   return axios.post(`/auth/signup`, body);
  // },
  login: (body) => {
    return axios.post(`/auth/login`, body);
  },
  refreshToken: (body) => {
    return axios.post(`/auth/refresh_token`, body);
  },
  logout: (body) => {
    return axios.delete(`/auth/logout`, body);
  },
  loggedIn: (body) => {
    return axios.post(`/auth/loggedIn`, body);
  },
};

export default api;