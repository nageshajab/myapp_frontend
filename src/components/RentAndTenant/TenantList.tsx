import { useEffect, useState } from "react";
import { DeleteTenant, GetTenants } from "../../api/TenantService";
import { Link } from "react-router-dom";

interface tenantItem {
  id: string;
  startDate: string;
  endDate: string;
  deposit: number;
  userid: string;
  tenantName: string;
  description: string;
  rent: number;
  mobile: number;
  isActive: boolean;
}

const TenantList = () => {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState<tenantItem[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    const res = await GetTenants({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
    });
    setTenants(res.data.tenants);
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
      await DeleteTenant(id);
      setLoading(false);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tenants</h2>
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
          <Link to="/tenant/create">
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
                <th>Deposit</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Is Active</th>
                <th>Description</th>
                <th>Rent</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((item) => (
                <tr key={item.id}>
                  <td>{item.tenantName}</td>
                  <td>{item.deposit}</td>
                  <td>
                    {new Date(item.startDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{new Date(item.endDate).toLocaleDateString("en-GB")}</td>
                  <td>
                    {item.hasOwnProperty("isActive")
                      ? item.isActive
                        ? "Yes"
                        : "No"
                      : "N/A"}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.rent}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <Link to={`/tenant/edit/${item.id}`}>
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

export default TenantList;
