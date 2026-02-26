import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import AddBookForm from "../components/AddBookForm";
import BookCard from "../components/BookCard";
import BorrowedCard from "../components/BorrowedCard";
import Pagination from "../components/Pagination";

function Books() {
    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [form, setForm] = useState({
        title: "",
        author: "",
        available_copies: 1,
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const booksPerPage = 6;

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        try {
            const token = localStorage.getItem("access");

            if (token) {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUsername(payload.username);
                if (payload.role === "ADMIN") setIsAdmin(true);
            }

            await fetchBooks();
            await fetchBorrows();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await API.get("books/");
            setBooks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBorrows = async () => {
        try {
            const res = await API.get("borrows/");
            setBorrows(res.data.filter((b) => !b.returned));
        } catch (error) {
            console.log(error);
        }
    };

    const handleBorrow = async (id) => {
        try {
            await API.post("borrows/", { book: id });
            await fetchBooks();
            await fetchBorrows();
            alert("Book borrowed successfully");
        } catch (error) {
            console.log(error.response?.data);
            alert("Borrow failed");
        }
    };

    const handleReturn = async (id) => {
        try {
            await API.patch(`borrows/${id}/`, { returned: true });
            await fetchBooks();
            await fetchBorrows();
            alert("Book returned successfully");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await API.post("books/", form);
            setForm({ title: "", author: "", available_copies: 1 });
            fetchBooks();
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = page * booksPerPage;
    const currentBooks = filteredBooks.slice(
        indexOfLast - booksPerPage,
        indexOfLast
    );

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar username={username} />

            <div className="p-8">

                {isAdmin && (
                    <AddBookForm
                        form={form}
                        setForm={setForm}
                        handleAddBook={handleAddBook}
                    />
                )}

                <input
                    type="text"
                    placeholder="Search books..."
                    className="border p-2 mb-6 w-full rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid md:grid-cols-3 gap-6">
                    {currentBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            handleBorrow={handleBorrow}
                        />
                    ))}
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />

                <h2 className="text-xl font-semibold mt-10 mb-4">
                    My Borrowed Books
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {borrows.map((borrow) => (
                        <BorrowedCard
                            key={borrow.id}
                            borrow={borrow}
                            handleReturn={handleReturn}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Books;