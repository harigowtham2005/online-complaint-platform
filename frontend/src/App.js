import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintForm from "./pages/ComplaintForm";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter basename="/online-complaint-platform">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/complaint"
          element={<ProtectedRoute component={ComplaintForm} />}
        />
        <Route
          path="/my-complaints"
          element={<ProtectedRoute component={MyComplaints} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute component={AdminDashboard} adminOnly />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
