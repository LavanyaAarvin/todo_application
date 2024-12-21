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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditTodoPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    status: "To Do",
  });

  const baseUrl  = import.meta.env.VITE_API_BASE_URL;


  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${baseUrl}/todo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setTodo(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch todo for editing:", error);
      }
    };

    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${baseUrl}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("Failed to fetch users");
      }
    };

    fetchTodo();
    fetchUsers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${baseUrl}/todo/${id}`,
        todo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Todo updated successfully!"); 
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      toast.error("Failed to update todo");

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
        Edit Todo
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <TextField
          label="Title"
          fullWidth
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          required
          sx={{ marginBottom: "16px" }} 
        />
        <TextField
          label="Description"
          fullWidth
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          value={
            todo.dueDate
              ? new Date(todo.dueDate).toISOString().split("T")[0]
              : ""
          } // Convert to 'YYYY-MM-DD'
          onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: "16px" }} 
        />

        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={todo.status}
            onChange={(e) => setTodo({ ...todo, status: e.target.value })}
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
            value={todo.assignedTo}
            onChange={(e) => setTodo({ ...todo, assignedTo: e.target.value })}
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
          Update Todo
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
