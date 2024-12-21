import { useState, useEffect } from "react";
import { Typography, CircularProgress, Box, Button  } from "@mui/material";
import axios from "axios";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 

export const ActivityLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate(); 

  const baseUrl  = import.meta.env.VITE_API_BASE_URL;

  
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
      fetchActivityLogs();
    }
  }, [navigate]);

  const fetchActivityLogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/activity-logs"`);
      setLogs(response.data.data); 
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />; 
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleCancel = () => {
    navigate("/home"); 
  };


  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Typography align="center" variant="h4" gutterBottom style={{ marginTop: "80px" }}>
        Activity Logs
      </Typography>
      <Box
        sx={{
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {logs.map((log, index) => (
          <Typography key={index} variant="body1" style={{ marginBottom: "10px", lineHeight: "1.6" }}>
            <CheckCircle style={{ marginRight: "10px", color: "#3f51b5" }} />
            <strong>{log.message}</strong>
            <br />
            <small style={{ color: "#666" }}>Timestamp: {log.timestamp}</small>
          </Typography>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
