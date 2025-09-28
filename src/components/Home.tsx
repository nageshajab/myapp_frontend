import { useEffect, useState } from "react";
import { EventDelete, GetEvents } from "../api/EventsService";
import { Link } from "react-router-dom";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  markFinished: boolean;
}

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchEvents = async () => {
    setLoading(true);
    const res = await GetEvents({
      pageNumber,
      searchText,
      userId: localStorage.getItem("token"),
      showAll,
    });
    setEvents(res.data.events); // updated to res.data.dates
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [pageNumber, searchText, showAll]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      setLoading(true);
      await EventDelete(id);
      setLoading(false);
      fetchEvents();
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Events Dashboard</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="input-group-append ms-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showAll"
                  checked={showAll}
                  onChange={(e) => setShowAll(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="showAll">
                  Show All
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <Link to="/events/create">
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
      ) : events.length === 0 ? (
        <div className="text-center my-5">
          <h5>No data available</h5>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row">
            {events.map((item) => (
              <>
                {/* {console.log(item.id)} */}
                <div key={item.id} className="col-md-3 mb-4">
                  <div className="card h-100">
                    <div
                      style={{
                        fontSize: "1rem",
                        backgroundColor: item.markFinished
                          ? "#d4edda"
                          : "#f8d7da", // ✅ greenish for finished, reddish for pending
                        padding: "0.75rem",
                        borderRadius: "6px",
                      }}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <h5 className="mb-0" style={{ fontSize: "1rem" }}>
                        <div>{item.title}</div>
                        {new Date(item.date)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                        <div>{item.duration}</div>
                      </h5>
                      <div>
                        <Link
                          to={`/events/edit/${item.id}`}
                          className="me-2 text-secondary"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
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

export default Home;
