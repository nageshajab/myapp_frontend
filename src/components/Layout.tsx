import { Link, useNavigate, Outlet } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/passwordlist">
                  Passwords
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/datelist">
                  Dates
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/khatalist">
                  Khatabook
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/changepassword">
                  Change Password
                </Link>
              </li>
            </ul>

            <div className="d-flex">
              {token ? (
                <>
                  <span className="navbar-text me-3">Welcome, {username}!</span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link className="btn btn-outline-primary" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
