import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "./ui/toggle";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-opacity-80 shadow-xl drop-shadow-lg" : "bg-opacity-100 shadow-md"
      } bg-[#141E30]/30 text-gold p-4 flex justify-between items-center border-b border-b-blue-300 rounded-b-xl`}
    >
      <div className="flex justify-between items-center">
        <Link to={'/'} className="text-2xl font-arabic font-bold cursor-pointer pr-8">
          Hayya Alal Falah
        </Link>
        <Link to="/salah-tracker" className="mr-4 text-gold hover:text-opacity-80 transition">
          Salah Tracker
        </Link>
        <Link to="/hadith" className="mr-4 text-gold hover:text-opacity-80 transition">
          Hadith
        </Link>
        <Link to="/notifications" className="mr-4 text-gold hover:text-opacity-80 transition">
          Notifications
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Toggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="text-gold" /> : <Moon className="text-gray-800" />}
        </Toggle>
        <button
          onClick={handleLogout}
          className="bg-gold text-black px-3 py-1 rounded font-bold hover:bg-opacity-80 transition shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
