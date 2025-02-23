import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/api/token/", credentials);
      localStorage.setItem("access_token", response.data.access);
      navigate("/salah-tracker"); // Redirect after login
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-gold font-sans">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-md border border-gold">
        <h2 className="text-2xl font-arabic text-center mb-6 text-gold">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-black text-gold border-gold focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-black text-gold border-gold focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            className="w-full bg-gold text-black py-2 rounded-sm font-bold hover:opacity-75 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
