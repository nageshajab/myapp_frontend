import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createTenant, updateTenant, GetTenant } from "../../api/TenantService";
import { useParams, useNavigate } from "react-router-dom";

const CreateTenant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    startDate: "0001-01-01",
    endDate: "0001-01-01",
    deposit: 0,
    tenantName: "",
    description: "",
    rent: 0,
    mobile: 0,
    isActive: true,
    userid: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      GetTenant(id)
        .then((res) => {
          const startdate = res.data.startDate.split("T")[0]; // Assuming date is in ISO format
          const enddate = res.data.endDate.split("T")[0]; // Assuming date is in ISO format
          setForm({ ...res.data, startDate: startdate, endDate: enddate });
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Error fetching data" + err);
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
    setLoading(true);
    try {
      if (id) {
        await updateTenant(form);
        toast.success(" updated successfully");
      } else {
        await createTenant(form);
        toast.success(" created successfully");
      }
      navigate("/tenantlist");
    } catch (err) {
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Create Tenant</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="form-control"
            min="0001-01-01"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">IsActive</label>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isActive: e.target.checked }))
            }
            className="form-check-input"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deposit</label>
          <input
            type="number"
            name="deposit"
            value={form.deposit}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tenant Name</label>
          <input
            type="text"
            name="tenantName"
            value={form.tenantName}
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
          <label className="form-label">Rent</label>
          <input
            type="number"
            name="rent"
            value={form.rent}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            min="0001-01-01"
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

        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary w-50 me-2"
            onClick={() => navigate("/tenantlist")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTenant;
