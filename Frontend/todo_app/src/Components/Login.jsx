import { Grid2, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"


export const Login = () => {
  const heading = { fontSize: "2.5rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroudColor: "blue",
    borderRadius: "0.5rem",
  };

  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl  = import.meta.env.VITE_API_BASE_URL;
    const loginUrl = `${baseUrl}/auth/login`;

    axios.post(loginUrl, {email, password})
    .then(result => {
      if(result.status == 200) {
        localStorage.setItem('token', result.data.token);
        navigate('/home')
      }
    })
    .catch(error => {
      if (error.response && error.response.data) {
        alert(error.response.data.error); 
      } else {
        alert("An error occurred. Please try again.");
      }
    });
  }
  

  return (
    <>
      <Grid2 align="center">
        <Paper
          style={paperStyle}
          sx={{
            width: {
              xs: "80vw",
              sm: "50vw",
              md: "40vw",
              lg: "30vw",
              xl: "20vw",
            },
            height: "60vh",
          }}
        >
          <Typography style={heading}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              style={row}
              type="email"
              name="email"
              label="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              style={row}
              type="password"
              name="password"
              label="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button type="submit" variant="contained" style={btnStyle}>
              {" "}
              Login
            </Button>
          </form>
        </Paper>
      </Grid2>
    </>
  );
};
