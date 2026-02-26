import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("auth/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      setError("Registration failed. Check details.");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-blue-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Join Our Library</h1>
          <p className="text-lg opacity-90">
            Create an account and start borrowing books today.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
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
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />

            <select
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;