function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="bg-gray-400 px-3 py-1 rounded"
      >
        Prev
      </button>

      <span>Page {page} of {totalPages || 1}</span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="bg-gray-400 px-3 py-1 rounded"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;