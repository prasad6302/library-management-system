import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import MyBooks from "./pages/MyBooks";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("access"));

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={() => setLoggedIn(true)} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/books"
        element={loggedIn ? <Books /> : <Navigate to="/" />}
      />
      <Route
        path="/my-books"
        element={loggedIn ? <MyBooks /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
