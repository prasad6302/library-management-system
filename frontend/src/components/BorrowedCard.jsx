function BorrowedCard({ borrow, handleReturn }) {
  return (
    <div className="bg-yellow-100 p-4 rounded shadow">
      <h3 className="font-bold">{borrow.book_title}</h3>
      <p>Due: {new Date(borrow.due_date).toLocaleDateString()}</p>

      {borrow.fine_amount > 0 && (
        <p className="text-red-600 font-semibold">
          Fine: ₹{borrow.fine_amount}
        </p>
      )}

      <button
        onClick={() => handleReturn(borrow.id)}
        className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
      >
        Return
      </button>
    </div>
  );
}

export default BorrowedCard;