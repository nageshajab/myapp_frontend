import { useEffect, useState } from "react";
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

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchData = async () => {
    console.log(pagination);
    setLoading(true);
    const res = await GetRents({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
      tenant: selectedTenant,
      month: selectedMonth,
      year: selectedYear,
    });
    setRents(res.data.rents);
    setTenants(res.data.tenants);
    setPagination(res.data.pagination);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, searchtxt, selectedTenant, selectedMonth, selectedYear]);

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
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by tenant name"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
          >
            <option value="">Select Tenant</option>
            {tenants.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
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
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tenant Name</th>
                <th>MSEB</th>
                <th>Paid Amount</th>
                <th>Remaining Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rents.map((item) => (
                <tr key={item.id}>
                  <td>{item.tenantName}</td>
                  <td>{item.mseb}</td>
                  <td>{item.paidAmount}</td>
                  <td>{item.remainingAmount}</td>
                  <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                  <td>
                    <Link to={`/rent/edit/${item.id}`}>
                      <button className="btn btn-sm btn-secondary me-2">
                        {" "}
                        Edit{" "}
                      </button>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
