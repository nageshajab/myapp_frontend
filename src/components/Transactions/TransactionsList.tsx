import { useEffect, useState } from "react";
import {
  DeleteTransaction,
  GetTransactionEntries,
} from "../../api/TransactionService";

import { Link } from "react-router-dom";

interface TransactionItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  userid: string;
  description: string;
}

const TransactionsList = () => {
  const [loading, setLoading] = useState(false);
  const [transactionentries, setTransactionEntries] = useState<
    TransactionItem[]
  >([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchTransactionEntries = async () => {
    setLoading(true);
    try {
      const res = await GetTransactionEntries({
        pageNumber,
        searchtxt,
        userid: localStorage.getItem("token"),
      });
      console.log(res.data);
      //  console.log(res.data.TransactionEntries);
      if (res.data && res.data.transactionEntries) {
        setTransactionEntries(res.data.transactionEntries);
        setPagination(res.data.pagination);
      } else {
        console.log("No data returned");
        setTransactionEntries([]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactionEntries();
  }, [pageNumber, searchtxt]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      setLoading(true);
      await DeleteTransaction(id);
      setLoading(false);
      fetchTransactionEntries();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Transaction entries</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by transaction entry"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <Link to="/transaction/create">
            <button className="btn btn-primary w-100">Add New</button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="list-group">
          {transactionentries.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">{item.description}</p>
                <p className="mb-1">{item.amount.toLocaleString("en-IN")}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <Link to={`/transaction/edit/${item.id}`}>
                  <button className="btn btn-sm btn-secondary me-2">
                    Edit
                  </button>
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {pagination.totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(pagination.totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  pageNumber === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                pageNumber === pagination.totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TransactionsList;
