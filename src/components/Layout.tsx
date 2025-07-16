import { Link, useNavigate, Outlet } from "react-router-dom";

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
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
          }}
        >
          <li>
            <Link to="/passwordlist">Password List</Link>
          </li>
          <li>
            <Link to="/datelist">Date List</Link>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <Link to="/changepassword">Change Password</Link>
          </li>
        </ul>
        <div style={{ display: "flex", alignItems: "center" }}>
          {token ? (
            <>
              <span style={{ marginRight: "1rem" }}>Welcome, {username}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
