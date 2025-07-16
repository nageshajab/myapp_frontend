import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { subscription_key } from "../../config";
import { toast } from "react-toastify";
const Login = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": subscription_key,
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        console.log(JSON.stringify(data));
        localStorage.setItem("token", data.user.id);
        localStorage.setItem("username", username);

        toast.success(`Welcome ${username}!`, {
          position: "top-right",
          autoClose: 2000, // close the toast after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/passwordlist");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h1 className="text-center mb-4">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
                {error && (
                  <p className="text-danger text-center mt-2">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
