import { useEffect, useState } from "react";
import { DeleteTask, GetTaskEntries } from "../../api/TaskService";
import { Link } from "react-router-dom";

interface TaskItem {
  id: string;
  title: string;
  date: string;
  description: string;
  status: string;
  userid: string;
}

const TaskList = () => {
  const [loading, setLoading] = useState(false);
  const [taskEntries, setTaskEntries] = useState<TaskItem[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchTaskEntries = async () => {
    setLoading(true);
    const res = await GetTaskEntries({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
    });
    if (res.data && res.data.taskEntries) {
      setTaskEntries(res.data.taskEntries);
      setPagination(res.data.pagination);
    } else {
      setTaskEntries([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTaskEntries();
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
      await DeleteTask(id);
      setLoading(false);
      fetchTaskEntries();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tasks</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Task entry"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <Link to="/task/create">
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
          {taskEntries.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">{item.description}</p>
                <p className="mb-1">{item.status}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <Link to={`/task/edit/${item.id}`}>
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

export default TaskList;
