import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyBooks() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("transactions/")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  const returnBook = async (id) => {
    await api.post(`transactions/${id}/return_book/`);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_returned: true } : item,
      ),
    );
  };

  const logout = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading issued books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 My Issued Books</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/books")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ← Back to Books
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {items.length === 0 && (
        <p className="text-gray-500">No books issued yet.</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white p-5 rounded shadow mb-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{item.book_title}</p>
            <p className="text-sm text-gray-500">
              Issued on: {new Date(item.issued_at).toLocaleDateString()}
            </p>
          </div>

          {!item.is_returned ? (
            <button
              onClick={() => returnBook(item.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Return
            </button>
          ) : (
            <span className="text-sm text-gray-400">Returned</span>
          )}
        </div>
      ))}
    </div>
  );
}
