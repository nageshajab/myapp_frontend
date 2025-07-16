import React, { useEffect, useState } from "react";
import {
  createPassword,
  updatePassword,
  getPassword,
} from "../api/passwordService";
import { useParams, useNavigate } from "react-router-dom";

const PasswordForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect to login if username is not in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    system: "",
    userName: "",
    password: "",
    userid: localStorage.getItem("token") || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPassword(id).then((res) => {
        console.log(res.data);
        console.log(JSON.stringify(res.data));

        setForm(res.data); // or res.data.password
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updatePassword(form);
    } else {
      await createPassword(form);
    }
    navigate("/passwordlist");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-5 p-4 border rounded shadow-sm bg-light"
      style={{ maxWidth: "500px" }}
    >
      <h3 className="mb-4 text-center">
        {id ? "Update Password" : "Create Password"}
      </h3>

      <div className="mb-3">
        <label htmlFor="system" className="form-label">
          System URL
        </label>
        <input
          type="text"
          className="form-control"
          id="system"
          name="system"
          value={form.system}
          onChange={handleChange}
          placeholder="Enter system URL"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="userName" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
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

      <div className="d-flex justify-content-between">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary w-50">
            {id ? "Update" : "Create"}
          </button>
        )}
        <button
          type="button"
          className="btn btn-secondary w-50 ms-2"
          onClick={() => navigate("/passwordlist")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
