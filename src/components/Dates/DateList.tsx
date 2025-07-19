import { useEffect, useState } from "react";
import { deleteDate, listdates } from "../../api/DatesService";
import { Link } from "react-router-dom";

interface DateItem {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  isRecurring: boolean;
  recurringEvent?: {
    frequency: string;
  };
}

const DateList = () => {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState<DateItem[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchDates = async () => {
    setLoading(true);
    const res = await listdates({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
    });
    setDates(res.data.dates); // updated to res.data.dates
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchDates();
  }, [pageNumber, searchtxt]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this date?"
    );
    if (confirmDelete) {
      setLoading(true);
      await deleteDate(id);
      setLoading(false);
      fetchDates();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Saved Dates</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Link to="/dates/create">
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
          {dates.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">{item.description}</p>
                <p className="mb-1">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="mb-1">
                  <strong>Duration:</strong> {item.duration}
                </p>
                {item.isRecurring && (
                  <span className="badge bg-info">
                    Recurring: {item.recurringEvent?.frequency}
                  </span>
                )}
              </div>
              <div>
                <Link to={`/dates/edit/${item.id}`}>
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

export default DateList;
