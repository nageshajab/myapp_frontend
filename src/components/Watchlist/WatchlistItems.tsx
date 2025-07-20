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
  status: number;
  type: number;
  language: number;
  genre: number;
  ott: number;
  date: string;
  userid: string;
}

const WatchlistItems = () => {
  const [loading, setLoading] = useState(false);
  const [movieentries, setMovieEntries] = useState<MovieItem[]>([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [pageNumber, setPgNo] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedOtt, setSelectedOtt] = useState("");
  const [distinctStatus, setDistinctStatus] = useState<string[]>([]);
  const [distinctType, setDistinctType] = useState<string[]>([]);
  const [distinctLanguage, setDistinctLanguage] = useState<string[]>([]);
  const [distinctGenre, setDistinctGenre] = useState<string[]>([]);
  const [distinctOtt, setDistinctOtt] = useState<string[]>([]);
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
      searchtxt,
      userid: localStorage.getItem("token"),
      status: selectedStatus,
      type: selectedType,
      language: selectedLanguage,
      genre: selectedGenre,
      ott: selectedOtt,
    });
    setMovieEntries(res.data.items);
    setDistinctStatus(res.data.distinctStatus);
    setDistinctType(res.data.distinctType);
    setDistinctLanguage(res.data.distinctLanguage);
    setDistinctGenre(res.data.distinctGenre);
    setDistinctOtt(res.data.distinctOtt);
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieEntries();
  }, [
    pageNumber,
    searchtxt,
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
      <h2 className="mb-3">Movie List</h2>
      <div className="row mb-3">
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by movie title"
            value={searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
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
        <ul className="list-group">
          {movieentries.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">Status: {getStatus(item.status)}</p>
                <p className="mb-1">Type: {getType(item.type)}</p>
                <p className="mb-1">Language: {getLanguage(item.language)}</p>
                <p className="mb-1">Genre: {getGenre(item.genre)}</p>
                <p className="mb-1">OTT: {getOtt(item.ott)}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div>
                <Link to={`/watchlistitems/edit/${item.id}`}>
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

export default WatchlistItems;
