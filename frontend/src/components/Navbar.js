import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">ResolveNow</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}
          {token && role === "user" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/complaint">New Complaint</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-complaints">My Complaints</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-danger ms-3" onClick={logout}>Logout</button>
              </li>
            </>
          )}
          {token && role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-danger ms-3" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
