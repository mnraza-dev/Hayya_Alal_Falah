import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

import { Toggle } from "./ui/toggle";

const Navbar = () => {
const [darkMode, setDarkMode] = useState(true);


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="bg-navy text-gold p-4 flex justify-between items-center border-b border-gold">
       <div className=" flex justify-between  items-center">
         <Link to={'/'} className="text-2xl font-arabic font-bold cursor-pointer pr-8">Hayya Alal Falah</Link>
    
        <Link
          to="/salah-tracker"
          className="mr-4 text-gold hover:text-opacity-80 transition"
        >
          Salah Tracker
        </Link>
        <Link
          to="/salah-tracker"
          className="mr-4 text-gold hover:text-opacity-80 transition"
        >
          Hadith{" "}
        </Link>
        <Link
          to="/salah-tracker"
          className="mr-4 text-gold hover:text-opacity-80 transition"
        >
          Notifications
        </Link>
      </div>
     <div className="flex items-center justify-center gap-2">
     <Toggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="text-gold" /> : <Moon className="text-gray-800" />}
        </Toggle>
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

export default Navbar;
