import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddTodoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("To Do");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const baseUrl  = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newTodo = {
      title,
      description,
      dueDate,
      assignedTo,
      status,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/todo`,
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Todo created successfully!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("Failed to add todo");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <Box
      mt={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add New Todo
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: "16px" }}
        />

        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel>Assigned To</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            label="Assigned To"
            required
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Todo
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};
