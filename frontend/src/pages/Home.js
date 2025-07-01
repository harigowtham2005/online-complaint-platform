import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import banner from "../assets/banner.jpg";

const Home = () => {
  return (
    <div className="home-container" style={{
      backgroundImage: `url(${banner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem"
    }}>
      <div className="bg-dark bg-opacity-50 p-5 rounded">
        <h1 className="display-4 fw-bold">Welcome to ResolveNow</h1>
        <p className="lead">
          A Smart Complaint Registration and Resolution Platform.
        </p>
        <div className="mt-4">
          <Link to="/register" className="btn btn-primary me-3 px-4 py-2">
            Register
          </Link>
          <Link to="/login" className="btn btn-outline-light px-4 py-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
