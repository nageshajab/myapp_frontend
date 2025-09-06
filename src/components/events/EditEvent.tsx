import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createEvent, updateEvent, EventGet } from "../../api/EventsService";
import { useParams, useNavigate } from "react-router-dom";

const CreateDateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    markFinished: false,
    userid: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      EventGet(id)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          const date = new Date(res.data.date);
          const formattedDate = date.toISOString().split("T")[0];
          res.data.date = formattedDate;
          setForm(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Error fetching date" + err);
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
    const target = e.target;
    const checked = target.type === "checkbox" ? target.checked : undefined;
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await updateEvent(form);
        toast.success("Date updated successfully");
      } else {
        await createEvent(form);
        toast.success("Date created successfully");
      }
      navigate("/datelist");
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
      <h2 className="text-center">Create/Edit Event</h2>
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
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          />
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

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="markFinished"
            checked={form.markFinished}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Mark Finished</label>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            type="button"
            className="btn btn-secondary flex-fill me-2"
            onClick={() => navigate("/home")}
          >
            {" "}
            Cancel{" "}
          </button>
          <button type="submit" className="btn btn-primary flex-fill">
            {" "}
            Save{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDateForm;
