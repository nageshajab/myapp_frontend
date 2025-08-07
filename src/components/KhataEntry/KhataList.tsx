import { useEffect, useState } from "react";
import { KhataDelete, GetKhataEntries } from "../../api/KhataService";
import { Link } from "react-router-dom";

interface KhataItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  userid: string;
  personName: string;
}

const KhataList = () => {
  const [loading, setLoading] = useState(false);
  const [khataentries, setKhataEntries] = useState<KhataItem[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [distinctPersons, setDistinctPersons] = useState<string[]>([]);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchKhataEntries = async () => {
    setLoading(true);
    const res = await GetKhataEntries({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
      personName: selectedPerson,
    });
    setKhataEntries(res.data.khataEntries);
    setDistinctPersons(res.data.distinctPersonNames);
    setPagination(res.data.pagination);

    setLoading(false);
  };

  useEffect(() => {
    fetchKhataEntries();
  }, [pageNumber, searchtxt, selectedPerson]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      setLoading(true);
      await KhataDelete(id);
      setLoading(false);
      fetchKhataEntries();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Khata book</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by khata entry"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
          >
            <option value="">Select Person</option>
            {distinctPersons.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <Link to="/khata/create">
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
          {khataentries.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">{item.personName}</p>
                <p className="mb-1">{item.amount.toLocaleString("en-IN")}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <Link to={`/khata/edit/${item.id}`}>
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

export default KhataList;
