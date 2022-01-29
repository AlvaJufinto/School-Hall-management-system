import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { GlobalStyles } from "./globals";
  
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Home />

      </div>
    </Router>
  );
}

export default App;
