import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DocumentCreate,
  DocumentUpdate,
  DocumentGet,
} from "../../api/DocumentsService";
import { useParams, useNavigate } from "react-router-dom";

const CreateDocumentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    title: string;
    url: string;
    tags: string[];
    userid: string;
  }>({
    title: "",
    url: "",
    tags: [],
    userid: localStorage.getItem("token") || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      DocumentGet(id)
        .then((res) => {
          setForm(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Error fetching document" + err);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setForm({ ...form, tags: value.split(", ") });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await DocumentUpdate(form);
        toast.success("Document updated successfully");
      } else {
        await DocumentCreate(form);
        toast.success("Document created successfully");
      }
      navigate("/documentlist");
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
      <h2 className="text-center">Create Document</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Url</label>
          <input
            type="text"
            name="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            className="form-control"
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value.split(", ") })
            }
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
            disabled
          />
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            type="button"
            className="btn btn-secondary flex-fill me-2"
            onClick={() => navigate("/documentlist")}
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

export default CreateDocumentForm;
