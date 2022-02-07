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
import Login from "./pages/admin/Login"

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-order/:packetId" element={<FormOrder />} />
          <Route path="/receipt/:receiptId" element={<Receipt />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
