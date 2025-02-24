import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="bg-black text-gold p-4 flex justify-between items-center border-b border-gold">
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

      <button
        onClick={handleLogout}
        className="bg-gold text-black px-3 py-1 rounded font-bold hover:bg-opacity-80 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
