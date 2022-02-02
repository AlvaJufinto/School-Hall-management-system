import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { GlobalStyles } from "./globals";
  
import Home from "./pages/Home";
import FormOrder from "./pages/FormOrder";

function App() {

  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/form-order/:packetId" element={<FormOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
