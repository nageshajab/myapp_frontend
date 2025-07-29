import { Link, useNavigate, Outlet } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";

const Layout = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleOnIdle = () => {
    handleLogout();
    toast.success("User is idle for more than 5 minutes. Logging out!", {
      position: "top-right",
      autoClose: 2000,
    });
    window.location.href = "/login";
  };

  const {} = useIdleTimer({
    timeout: 5 * 60 * 1000, // 5 minutes
    onIdle: handleOnIdle,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    if (instance) instance.logoutPopup();
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
              <NavDropdown title="Finance" id="finance-dropdown">
                <NavDropdown.Item as={Link} to="/khatalist">
                  Khatabook
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/transactionlist">
                  Transactions
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/tenantlist">
                  Tenants
                </NavDropdown.Item>
                <NavDropdown title="Rent" id="rent-dropdown">
                  <NavDropdown.Item as={Link} to="/rentlist">
                    Rents
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/getpendingrents">
                    Pending Rents
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
              <NavDropdown title="Tasks" id="tasks-dropdown">
                <NavDropdown.Item as={Link} to="/tasklist">
                  To do
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/watchlistitems">
                  Watchlist Items
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
            <div className="d-flex">
              {token ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    Welcome, {username}!
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/changepassword">
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
