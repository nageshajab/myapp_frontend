import { useEffect, useState } from "react";
import { DeleteMovie, GetMovies } from "../../api/MovieService";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";
import { subscription_key } from "../../../config";
interface Movie {
  id: string;
  userId: string;

  title: string;
  imageData: Uint32Array;
  tags: string[];
}

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchMovies = async () => {
    setLoading(true);
    const res = await GetMovies({
      pageNumber,
      searchtxt,
      userid: localStorage.getItem("token"),
    });
    setMovies(res.data.movies); // updated to res.data.dates
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [pageNumber, searchtxt]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      setLoading(true);
      await DeleteMovie(id);
      setLoading(false);
      fetchMovies();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Movie List</h2>
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
          <Link to="/movielist/create">
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
          {movies.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">
                  {API_URL.includes("myreactappbackendapi") ? (
                    ///image/6888e66e366bc0dc528909fe?id=6888e66e366bc0dc528909fe&subscription-key=feb18fe559a248ccaa1ff22b56aaa3f2
                    <img
                      src={`${API_URL}/image/${item.id}?id=${item.id}?subscription-key=${subscription_key}`}
                      alt="MongoDB Image"
                    />
                  ) : (
                    <img
                      src={`${API_URL}/image/${item.id}`}
                      alt="MongoDB Image"
                    />
                  )}
                </p>
                <p className="mb-1">
                  <strong>Tags:</strong> {item.tags}
                </p>
              </div>
              <div>
                <Link to={`/movielist/edit/${item.id}`}>
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

export default MovieList;
