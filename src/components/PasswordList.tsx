import React, { useEffect, useState } from "react";
import { listPasswords, deletePassword } from "../api/passwordService";
import { Link } from "react-router-dom";

const PasswordList: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchPasswords = async () => {
    setLoading(true);
    const res = await listPasswords({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
    });
    setPasswords(res.data.passwords);
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchPasswords();
  }, [pageNumber, searchtxt]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber); // This triggers useEffect and fetches new data
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmDelete) {
      await deletePassword(id);
      fetchPasswords();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Password List</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by URL"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Link to="/passwordlist/create">
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
          {passwords.map((item: any) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.system}</h5>
                <small>Username: {item.userName}</small>
              </div>
              <div>
                <Link to={`/passwordlist/edit/${item.id}`}>
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

export default PasswordList;
