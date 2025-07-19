import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createTaskentry,
  updateTaskEntry,
  GetTask,
} from "../../api/TaskService";
import { useParams, useNavigate } from "react-router-dom";

const CreateTaskEntryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: 0,
    date: "",
    status: "",
    userid: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      GetTask(id)
        .then((res) => {
          const formattedDate = res.data.date.split("T")[0]; // Assuming date is in ISO format
          setForm({ ...res.data, date: formattedDate });
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await updateTaskEntry(form);
        toast.success("Task updated successfully");
      } else {
        await createTaskentry(form);
        toast.success("Task created successfully");
      }
      navigate("/tasklist");
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
      <h2 className="text-center">Create Task</h2>
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
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
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
            className="form-select"
            required
          >
            <option value="">Select status</option>
            <option value="NotStarted">Not Started</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
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
            onClick={() => navigate("/tasklist")}
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

export default CreateTaskEntryForm;
