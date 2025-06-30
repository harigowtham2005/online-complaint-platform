import React, { useEffect, useState } from "react";
import api from "../services/api";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api.get("/complaints/mine").then((res) => {
      setComplaints(res.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">My Complaints</h3>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="list-group">
          {complaints.map((c) => (
            <div key={c._id} className="list-group-item">
              <h5>{c.title}</h5>
              <p>{c.description}</p>
              <span className={`badge bg-${c.status === "Resolved" ? "success" : c.status === "Rejected" ? "danger" : "warning"}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
