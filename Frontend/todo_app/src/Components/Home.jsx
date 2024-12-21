import { useState, useEffect } from 'react';
import { Button, Box, Grid2, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import TodoItem from './TodoItems';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [sortOption, setSortOption] = useState("dueDate");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  const baseUrl  = import.meta.env.VITE_API_BASE_URL;


  // Fetch Todos
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTodos(response.data.data);
        setFilteredTodos(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  // Fetch Users for Assigned To filter
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchUsers();
  }, []);

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${baseUrl}/todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Remove the deleted todo from the state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        fetchTodos();
        toast.error('Todo deleted successfully!');
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const editTodo = (id) => {
    navigate(`/edit-todo/${id}`);
  };

  const handleFilterStatusChange = (event) => {
    const status = event.target.value;
    setFilterStatus(status);
    filterTodos(status, filterAssignedTo);
  };

  const handleFilterAssignedToChange = (event) => {
    const assignedTo = event.target.value;
    setFilterAssignedTo(assignedTo);
    filterTodos(filterStatus, assignedTo);
  };

  const filterTodos = (status, assignedTo) => {
    let updatedTodos = todos;

    if (status) {
      updatedTodos = updatedTodos.filter((todo) => todo.status === status);
    }

    if (assignedTo) {
      updatedTodos = updatedTodos.filter(
        (todo) => todo.assignedTo === assignedTo
      );
    }

    setFilteredTodos(updatedTodos);
    sortTodos(sortOption, updatedTodos);
  };

  const sortTodos = (option, todosList) => {
    let sortedTodos = [...todosList];

    if (option === "dueDate") {
      sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (option === "status") {
      sortedTodos.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredTodos(sortedTodos);
  };

  const resetFilters = () => {
    setFilterStatus("");
    setFilterAssignedTo("");
    setFilteredTodos(todos);
  };

  return (
    <Box
      mt={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: "0 16px",
        marginTop: "120px",
      }}
    >
      <ToastContainer />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginTop: "20px", color: "black", fontWeight: "bold" }}
      >
        My Todo List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add-todo")}
        sx={{ marginBottom: "20px" }}
      >
        Add Todo
      </Button>

      {/* Filter */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          backgroundColor: "white",
          padding: 2,
        }}
      >
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={handleFilterStatusChange}>
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Assigned To</InputLabel>
          <Select value={filterAssignedTo} onChange={handleFilterAssignedToChange}>
            <MenuItem value="">All</MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={resetFilters}
          sx={{ height: "40px" }}
        >
          Reset
        </Button>
      </Box>

      <Box sx={{ width: "100%", maxHeight: "calc(100vh - 200px)" }}>
        {filteredTodos.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No records found
          </Typography>
        ) : (
          <Grid2 container spacing={3} justifyContent="center">
            {filteredTodos.map((todo) => (
              <Grid2 item xs={12} sm={8} md={6} key={todo._id}>
                <TodoItem
                  todo={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Box>
    </Box>
  );
};
