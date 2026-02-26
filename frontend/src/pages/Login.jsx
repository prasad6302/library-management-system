import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login/", form);
      login(res.data);
      navigate("/books");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Library System</h1>
          <p className="text-lg opacity-90">
            Manage books, track borrowing, and handle fines easily.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;