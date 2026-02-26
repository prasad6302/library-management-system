function AddBookForm({ form, setForm, handleAddBook }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg mb-10 border border-gray-100">

      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Add New Book
        </h2>
        <span className="text-sm text-gray-400">
          Admin Panel
        </span>
      </div>

      <form onSubmit={handleAddBook} className="space-y-5">

        {/* Inputs Row */}
        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Book Title"
            className="border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Author Name"
            className="border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Copies"
            min="1"
            className="border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={form.available_copies}
            onChange={(e) =>
              setForm({
                ...form,
                available_copies: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Button Row */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-2 rounded-lg shadow hover:scale-105 hover:shadow-md transition duration-200"
          >
            + Add Book
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddBookForm;