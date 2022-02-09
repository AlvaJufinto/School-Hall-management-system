import { useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { GlobalStyles } from "./globals";

// User
import Home from "./pages/user/Home";
import FormOrder from "./pages/user/FormOrder";
import Receipt from "./pages/user/Receipt";

// Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

import NotFound from "./pages/NotFound";

import { AuthContext } from "./context/Auth/AuthContext";
import api from "./api/auth";

function App() {
  const { display, isLoggedIn, isLoading, dispatch, isError, errorMessage } = useContext(AuthContext);

  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/form-order/:packetId" element={<FormOrder />} />
          <Route path="/receipt/:receiptId" element={<Receipt />} />
          
          {/* Admin */}
          <Route path="/admin/login" element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login />} />
          <Route path="/admin/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/admin/login" /> } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
