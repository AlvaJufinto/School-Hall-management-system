import axios from "axios";

import { baseUrl } from "./interceptor";

//functions to make auth calls
const api = {
  // signup: (body) => {
  //   return axios.post(`/auth/signup`, body);
  // },
  login: (body) => {
    return axios.post(`${baseUrl}/auth/login`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/auth/refresh_token`, body);
  },
  logout: (body) => {
    return axios.delete(`${baseUrl}/auth/logout`, body);
  },
  loggedIn: (body) => {
    return axios.post(`${baseUrl}/auth/loggedIn`, body);
  },
};

export default api;