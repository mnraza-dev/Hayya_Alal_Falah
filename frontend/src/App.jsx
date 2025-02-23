import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SalahTracker from "./pages/SalahTracker";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="bg-black text-gold p-4 flex justify-between border-b border-gold">
      <h1 className="text-2xl font-arabic font-bold">Hayya Alal Falah</h1>
      <div>
        <Link to="/salah-tracker" className="mr-4 text-gold hover:text-opacity-80 transition">Salah Tracker</Link>
        <button 
          onClick={handleLogout} 
          className="bg-gold text-black px-3 py-1 rounded font-bold hover:bg-opacity-80 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/salah-tracker" element={<SalahTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
