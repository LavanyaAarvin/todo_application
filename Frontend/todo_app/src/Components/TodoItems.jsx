import { Card, CardContent, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, deleteTodo, editTodo }) => {

    const baseUrl  = import.meta.env.VITE_API_BASE_URL;

    const [userName, setUserName] = useState('');

    useEffect(() => {
      const fetchUserName = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${baseUrl}/users/${todo.assignedTo}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (response.status === 200) {
            setUserName(response.data.data.name);
          }
        } catch (error) {
          console.error('Failed to fetch user name:', error);
          setUserName('Unknown');
        }
      };
      fetchUserName();
    }, [todo.assignedTo]);

    const formatDueDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
      };


  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{todo.title}</Typography>
        <Typography variant="body2">{todo.description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Due date: {formatDueDate(todo.dueDate)} | Assigned To: {userName} | Status: {todo.status}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => editTodo(todo._id)}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => deleteTodo(todo._id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
