import { useEffect, useState } from "react";
import { KhataDelete, GetKhataEntries } from "../../api/KhataService";
import { Link } from "react-router-dom";
import { DeleteRent, GetRents } from "../../api/RentService";

interface rentItem {
  id: string;
  date: string;
  paidAmount: number;
  remainingAmount: number;
  mseb: number;
  userid: string;
  tenantName: string;
}

const RentList = () => {
  const [loading, setLoading] = useState(false);
  const [rents, setRents] = useState<rentItem[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenants, setTenants] = useState<string[]>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const fetchData = async () => {
    setLoading(true);
    const res = await GetRents({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
      tenant: selectedTenant,
      month: pagination.month,
      year: pagination.year,
    });
    setRents(res.data.rents);
    setTenants(res.data.tenants);
    setPagination(res.data.pagination);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, searchtxt, selectedTenant]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      setLoading(true);
      await DeleteRent(id);
      setLoading(false);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Rents</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by tenant name"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedTenant}
            onChange={(e) => {
              setSelectedTenant(e.target.value);
              setPagination((prev) => ({
                ...prev,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                pageNumber: 1,
              }));
            }}
          >
            <option value="">Select Tenant</option>
            {tenants.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <Link to="/rent/create">
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
          {rents.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.tenantName}</h5>
                <p className="mb-1">{item.mseb}</p>
                <p className="mb-1">{item.paidAmount}</p>
                <p className="mb-1">{item.remainingAmount}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <Link to={`/rent/edit/${item.id}`}>
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

export default RentList;
