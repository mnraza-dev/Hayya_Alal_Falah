import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SalahTracker from "./pages/SalahTracker";
import Navbar from "./components/Navbar";
import ChallengesList from "./components/ChallengesList";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/salah-tracker" element={<SalahTracker />} />
        <Route path="/challenges" element={<ChallengesList />} />
      </Routes>
    </Router>
  );
}

export default App;
