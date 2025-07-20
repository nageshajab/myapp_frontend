import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createRent,
  updateRent,
  GetRent,
  GetAllTenants,
} from "../../api/RentService";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const CreateRent = () => {
  var month = new Date().getMonth() + 1;
  var formattedMonth = month < 10 ? `0${month}` : month.toString();
  const now = moment();
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenants, setTenants] = useState<string[]>([]);
  var year = new Date().getFullYear();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: `${new Date().getFullYear()}-${formattedMonth}-01`,
    paidAmount: 0,
    remainingAmount: 0,
    mseb: 0,
    tenantName: "",
    userid: localStorage.getItem("token") || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllTenants({
      userid: localStorage.getItem("token"),
    })
      .then((res) => {
        setTenants(res.data);
      })
      .catch((err) => {
        toast.error("Error fetching data" + err);
      });

    if (id) {
      setLoading(true);
      GetRent(id)
        .then((res) => {
          var date = moment(res.data.date).format("yyyy-MM-DD");
          setForm({ ...res.data, date: date });
          setSelectedTenant(res.data.tenantName); // Add this line
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

    try {
      if (id) {
        await updateRent(form);
        toast.success("updated successfully");
      } else {
        await createRent(form);
        toast.success(" created successfully");
      }
      navigate("/rentlist");
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
      <h2 className="text-center">Create Rent</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
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
          <label className="form-label">paidAmount</label>
          <input
            type="number"
            name="paidAmount"
            value={form.paidAmount}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">RemainingAmount</label>
          <input
            type="text"
            name="remainingAmount"
            value={form.remainingAmount}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mseb</label>
          <input
            type="number"
            name="mseb"
            value={form.mseb}
            onChange={handleChange}
            className="form-control"
          />
        </div>{" "}
        <select
          className="form-select"
          value={selectedTenant}
          onChange={(e) => {
            setSelectedTenant(e.target.value);
            setForm((prev) => ({ ...prev, tenantName: e.target.value }));
          }}
        >
          <option value="">Select Tenant</option>
          {tenants.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
        </select>
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
            onClick={() => navigate("/rentlist")}
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

export default CreateRent;
