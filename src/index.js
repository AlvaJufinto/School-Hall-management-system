import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext"; 
import { UserInfoContextProvider } from "./context/UserInfoContext";

ReactDOM.render(
  <React.StrictMode>
    <UserInfoContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UserInfoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
