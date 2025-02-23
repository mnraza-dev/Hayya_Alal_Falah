import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SalahTracker from "./pages/SalahTracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/salah-tracker" element={<SalahTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
