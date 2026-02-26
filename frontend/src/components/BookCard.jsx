function BookCard({ book, handleBorrow }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{book.title}</h3>
      <p>{book.author}</p>
      <p>Available: {book.available_copies}</p>

      <button
        onClick={() => handleBorrow(book.id)}
        disabled={book.available_copies <= 0}
        className={`mt-3 w-full py-2 rounded text-white ${
          book.available_copies > 0
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Borrow
      </button>
    </div>
  );
}

export default BookCard;