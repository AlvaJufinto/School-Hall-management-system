import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { GlobalStyles } from "./globals";
  
import Home from "./pages/Home";
import FormOrder from "./pages/FormOrder";
import Receipt from "./pages/Receipt";

function App() {

  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-order/:packetId" element={<FormOrder />} />
          <Route path="/receipt/:receiptId" element={<Receipt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
