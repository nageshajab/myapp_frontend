import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createWatchlistItem,
  updateWatchlistItem,
  getwachlistitem,
} from "../../api/WatchlistService";
import { useParams, useNavigate } from "react-router-dom";

const CreateWatchlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    status: "",
    type: "",
    language: "",
    genre: "",
    ott: "",
    date: "",
    userid: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getwachlistitem(id)
        .then((res) => {
          const formattedDate = res.data.date.split("T")[0];
          setForm({ ...res.data, date: formattedDate });
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Error fetching watchlist item" + err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateWatchlistItem(form);
        toast.success("Watchlist item updated successfully");
      } else {
        await createWatchlistItem(form);
        toast.success("Watchlist item created successfully");
      }
      navigate("/watchlistitems");
    } catch (err) {
      toast.error("Error submitting form");
    } finally {
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Create Watchlist Item</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Status</option>
            <option value="0">NotStarted</option>
            <option value="1">InProgress</option>
            <option value="2">Completed</option>
            <option value="3">Cancelled</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Type</option>
            <option value="0">Movie</option>
            <option value="1">WebSeries</option>
            <option value="2">Documentary</option>
            <option value="3">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Language</label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Langugage</option>
            <option value="0">English</option>
            <option value="1">Hindi</option>
            <option value="2">Tamil</option>
            <option value="3">Malyalam</option>
            <option value="4">Marathi</option>
            <option value="5">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Genre</option>, , , , Other
            <option value="0">Action</option>
            <option value="1">Comedy</option>
            <option value="2">Drama</option>
            <option value="3">Horror</option>
            <option value="4">Thriller</option>
            <option value="5">Romance</option>
            <option value="6">SciFi</option>
            <option value="7">Documentary</option>
            <option value="8">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">OTT</label>
          <select
            name="ott"
            value={form.ott}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Genre</option>, , , , Other
            <option value="Netflix">Netflix</option>
            <option value="Prime">Prime</option>
            <option value="Hotstar">Hotstar</option>
            <option value="SonyLiv">SonyLiv</option>
            <option value="Zee5">Zee5</option>
            <option value="YouTube">YouTube</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3" hidden>
          <label htmlFor="userid" className="form-label">
            User ID
          </label>
          <input
            type="text"
            className="form-control"
            id="userid"
            name="userid"
            value={form.userid}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary w-50 me-2"
            onClick={() => navigate("/watchlistitems")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary w-50">
            Save
          </button>
        </div>
      </form>
        
    </div>
  );
};

export default CreateWatchlist;
