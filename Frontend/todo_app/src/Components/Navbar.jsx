import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import { useState, useEffect } from "react";

export const Navbar = () => {

  const button = {
    marginRight: "20px",
    fontSize: "1.2rem",
    fontWeight: "700",
    padding: "0.3rem 1.4rem",
  };

  const textLinkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginRight: "20px",
    cursor: "pointer",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []); 

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Todo Lists
          </Typography>

          {isLoggedIn && (
            <Link to="/activity-logs" style={textLinkStyle}>
              Activity Logs
            </Link>
           )} 


          {!isLoggedIn ? (
            <>
              <Button
                style={button}
                color="error"
                variant="contained"
                to="/login"
                component={Link}
              >
                Login
              </Button>
              <Button
                style={button}
                color="success"
                variant="contained"
                to="/signup"
                component={Link}
              >
                Signup
              </Button>
            </>
          ) : (
            <Logout />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
