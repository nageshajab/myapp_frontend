import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createTransactionentry,
  updateTransactionEntry,
  GetTransaction,
} from "../../api/TransactionService";
import { useParams, useNavigate } from "react-router-dom";

const CreateTransactionEntryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    date: "",
    amount: 0,
    userid: localStorage.getItem("token") || "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      GetTransaction(id)
        .then((res) => {
          const formattedDate = res.data.date.split("T")[0]; // Assuming date is in ISO format
          setForm({ ...res.data, date: formattedDate });
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Error fetching transaction" + err);
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
        await updateTransactionEntry(form);
        toast.success("transaction updated successfully");
      } else {
        await createTransactionentry(form);
        toast.success("transaction created successfully");
      }
      navigate("/transactionlist");
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
      <h2 className="text-center">Create Transaction</h2>
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
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="form-control"
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

        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary w-50 me-2"
            onClick={() => navigate("/transactionlist")}
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

export default CreateTransactionEntryForm;
