import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createkhataentry,
  updateKhataEntry,
  KhataGet,
} from "../api/KhataService";
import { useParams, useNavigate } from "react-router-dom";

const CreateKhataEntryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    amount: 0,
    date: "",
    userid: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      KhataGet(id)
        .then((res) => {
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
        await updateKhataEntry(form);
        toast.success("khata updated successfully");
      } else {
        await createkhataentry(form);
        toast.success("khata created successfully");
      }
      navigate("/khatalist");
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
      <h2 className="text-center">Create Date</h2>
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
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
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

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateKhataEntryForm;
