import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issuingId, setIssuingId] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await api.get("books/");
      setBooks(res.data);
    } catch {
      localStorage.removeItem("access");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const issueBook = async (bookId) => {
    try {
      setIssuingId(bookId);
      await api.post("transactions/", { book: bookId });
      alert("Book issued successfully");
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.detail || "Issue failed");
    } finally {
      setIssuingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            📚 Library Management
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-books")}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              My Books
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Books */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6">Available Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>

              <p className="text-sm mb-3">Available: {book.available_copies}</p>

              <button
                onClick={() => issueBook(book.id)}
                disabled={book.available_copies === 0 || issuingId === book.id}
                className={`w-full py-2 rounded ${
                  book.available_copies > 0 && issuingId !== book.id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {issuingId === book.id ? "Issuing..." : "Issue Book"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
