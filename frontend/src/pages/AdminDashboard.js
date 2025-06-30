import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Badge } from "react-bootstrap";

const API = "http://localhost:5000/api"; // Update if deployed

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("❌ Error fetching complaints:", err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API}/complaints/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComplaints(); // Refresh the list
    } catch (err) {
      console.error("❌ Failed to update status:", err.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      {complaints.length === 0 ? (
        <p>No complaints available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.user?.name || "N/A"}</td>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>
                  <Badge
                    bg={
                      complaint.status === "Pending"
                        ? "warning"
                        : complaint.status === "Resolved"
                        ? "success"
                        : "danger"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleStatusChange(complaint._id, "Resolved")}
                    className="me-2"
                  >
                    Resolve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleStatusChange(complaint._id, "Rejected")}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
