import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ username }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow">

      <h1 className="font-bold text-lg">
        Library System
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/books" className="hover:underline">
          Books
        </Link>

        <Link to="/history" className="hover:underline">
          Borrow History
        </Link>

        <span className="font-medium">
          Welcome, {username}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;