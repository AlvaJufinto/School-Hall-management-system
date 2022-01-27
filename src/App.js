import { GlobalStyles } from "./globals";
import StyledNavbar from "./components/Navbar.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <StyledNavbar />
      </div>
    </Router>
  );
}

export default App;
