import { Grid2, Paper, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const heading = { fontSize: "2.5rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const formStyle = { display: "flex", flexDirection: "column", marginTop: "1rem" };
  const fieldStyle = { marginBottom: "1.5rem" };
  const btnStyle = {
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const baseUrl  = import.meta.env.VITE_API_BASE_URL;


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/auth/register`, { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          console.log("User created successfully..!!!");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          window.alert("Email already exists. Please login");
        } else {
          console.log(error);
        }
      });
  };

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
            height: "auto",
          }}
        >
          <Typography style={heading}>Signup</Typography>
          <form onSubmit={handleSubmit} style={formStyle}>
            <TextField
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              style={fieldStyle}
              type="text"
              name="name"
              label="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              style={fieldStyle}
              type="email"
              name="email"
              label="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              style={fieldStyle}
              type="password"
              name="password"
              label="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" style={btnStyle}>
              Signup
            </Button>
          </form>
        </Paper>
      </Grid2>
    </>
  );
};
