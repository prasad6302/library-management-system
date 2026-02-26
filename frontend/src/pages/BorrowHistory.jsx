import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function BorrowHistory() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const res = await API.get("borrows/");
      setBorrows(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">
          Borrow History
        </h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Book</th>
                <th className="p-4">Borrowed Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow.id} className="border-t">
                  <td className="p-4">
                    {borrow.user_username || borrow.user}
                  </td>
                  <td className="p-4">
                    {borrow.book_title || borrow.book}
                  </td>
                  <td className="p-4">
                    {new Date(borrow.borrowed_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {borrow.returned ? (
                      <span className="text-green-600 font-semibold">
                        Returned
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Borrowed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default BorrowHistory;