import { useEffect, useState } from "react";
import {
  DeleteWatchlistitem,
  GetWatchlistItems,
} from "../../api/WatchlistService";
import { Link } from "react-router-dom";
import { getStatus, getType, getLanguage, getGenre, getOtt } from "./common";

interface MovieItem {
  id: string;
  title: string;
  description: string;
  status: number;
  type: number;
  language: number;
  genre: number;
  ott: number;
  date: string;
  userId: string;
}

const WatchlistItems = () => {
  const [loading, setLoading] = useState(false);
  const [movieentries, setMovieEntries] = useState<MovieItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedOtt, setSelectedOtt] = useState("");
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchMovieEntries = async () => {
    setLoading(true);
    const res = await GetWatchlistItems({
      pageNumber,
      searchText,
      userId: localStorage.getItem("token"),
      status: selectedStatus,
      type: selectedType,
      language: selectedLanguage,
      genre: selectedGenre,
      ott: selectedOtt,
    });
    setMovieEntries(res.data.items);
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieEntries();
  }, [
    pageNumber,
    searchText,
    selectedStatus,
    selectedType,
    selectedLanguage,
    selectedGenre,
    selectedOtt,
  ]);

  const handlePageChange = (newPageNumber: number) => {
    setPgNo(newPageNumber);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      setLoading(true);
      await DeleteWatchlistitem(id);
      setLoading(false);
      fetchMovieEntries();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Watch List</h2>
      <div className="row mb-3">
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by movie title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="NotStarted">NotStarted</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="movie">Movie</option>
            <option value="WebSeries">WebSeries</option>
            <option value="Documentary">Documentary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Langugage</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Malyalam">Malyalam</option>
            <option value="Marathi">Marathi</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Select Genre</option>

            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="SciFi">SciFi</option>
            <option value="Documentary">Documentary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedOtt}
            onChange={(e) => setSelectedOtt(e.target.value)}
          >
            <option value="">Select OTT</option>

            <option value="Netflix">Netflix</option>
            <option value="Prime">Prime</option>
            <option value="Hotstar">Hotstar</option>
            <option value="SonyLiv">SonyLiv</option>
            <option value="Zee5">Zee5</option>
            <option value="YouTube">YouTube</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <Link to="/watchlistitems/create">
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
        <div className="row">
          {movieentries.map((item) => (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {getStatus(item.status)},{getType(item.type)},
                    {getLanguage(item.language)},{getGenre(item.genre)},
                    {getOtt(item.ott)}{" "}
                    <img
                      src={`/icons/${getOtt(item.ott)}.png`}
                      alt={getOtt(item.ott)}
                      style={{ width: "34px", height: "24px" }}
                    />
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/watchlistitems/edit/${item.id}`}>
                    <button className="btn btn-sm btn-secondary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default WatchlistItems;
