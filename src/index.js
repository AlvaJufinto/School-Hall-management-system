import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext"; 
import { AdminOrderContextProvider } from "./context/AdminOrderContext";

ReactDOM.render(
  <React.StrictMode>
    <AdminOrderContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AdminOrderContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
