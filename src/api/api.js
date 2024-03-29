/** @format */

import axios from "axios";
import { baseUrl } from "./interceptor";

export const clientDataApi = {
  allData: () => {
    return axios.get(`${baseUrl}/client/getAllData`);
  },
  allPackets: () => {
    return axios.get(`${baseUrl}/client/getalldata?q=paket`);
  },
  packet: ({ params }) => {
    return axios.get(`${baseUrl}/client/getpaket/${params}`);
  },
  order: ({ params }) => {
    return axios.get(`${baseUrl}/client/getorder/${params}`);
  },
  addOrder: ({ params }, detail) => {
    return axios.post(`${baseUrl}/client/order/${params}`, detail);
  },
  getAvailableDate: ({ month, year }) => {
    return axios.get(`${baseUrl}/client/avDate?month=${month}&year=${year}`);
  },
};

export const authApi = {
  login: (body) => {
    return axios.post(`${baseUrl}/auth/login`, body);
  },
  logout: (body) => {
    return axios.delete(`${baseUrl}/auth/logout`, body);
  },
  loggedIn: (body) => {
    return axios.post(`${baseUrl}/auth/loggedIn`, body);
  },
};

export const adminDataApi = {
  allData: ({ accessToken }) => {
    return axios.get(`${baseUrl}/admin/getalldata`, {
      headers: {
        jwt: accessToken,
      },
    });
  },
  deleteOrder: ({ params, accessToken }) => {
    return axios.delete(`${baseUrl}/admin/delete/order/${params}`, {
      headers: {
        jwt: accessToken,
      },
    });
  },
  editOrder: ({ params, accessToken }, detail) => {
    return axios.post(`${baseUrl}/admin/edit/order/${params}`, detail, {
      headers: {
        jwt: accessToken,
      },
    });
  },
  addPacket: ({ accessToken }, detail) => {
    return axios.post(`${baseUrl}/admin/tambahpaket`, detail, {
      headers: {
        jwt: accessToken,
      },
    });
  },
  deletePacket: ({ params, accessToken }) => {
    return axios.delete(`${baseUrl}/admin/delete/paket/${params}`, {
      headers: {
        jwt: accessToken,
      },
    });
  },
  editPacket: ({ params, accessToken }, detail) => {
    return axios.post(`${baseUrl}/admin/edit/paket/${params}`, detail, {
      headers: {
        jwt: accessToken,
      },
    });
  },
};
