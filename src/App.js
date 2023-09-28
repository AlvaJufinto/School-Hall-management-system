/** @format */

import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { GlobalStyles } from "./globals";

// User
import Home from "./pages/user/Home";
import Schedule from "./pages/user/Schedule";
import FormOrder from "./pages/user/FormOrder";
import Receipt from "./pages/user/Receipt";

// Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import OrderQueue from "./pages/admin/OrderQueue";
import OrderView from "./pages/admin/OrderView";
import OrderDone from "./pages/admin/OrderDone";
import OrderCancel from "./pages/admin/OrderCancel";
import Packet from "./pages/admin/PacketAdmin";

import NotFound from "./pages/NotFound";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/form-order/:packetId" element={<FormOrder />} />
          <Route path="/receipt/:receiptId" element={<Receipt />} />

          {/* Admin */}
          <Route
            path="/admin/login"
            element={
              isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login />
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/order-queue"
            element={
              isLoggedIn ? <OrderQueue /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/order-done"
            element={
              isLoggedIn ? <OrderDone /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/order-cancel"
            element={
              isLoggedIn ? <OrderCancel /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/order/:orderId"
            element={
              isLoggedIn ? <OrderView /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/packet"
            element={isLoggedIn ? <Packet /> : <Navigate to="/admin/login" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
