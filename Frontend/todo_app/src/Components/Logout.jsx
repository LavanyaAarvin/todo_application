import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const button = {
    marginRight: "20px",
    fontSize: "1.2rem",
    fontWeight: "700",
    padding: "0.3rem 1.4rem",
  };

  const navigate = useNavigate();

  const baseUrl  = import.meta.env.VITE_API_BASE_URL;


  const handleLogOut = () => {
    // Clear token from localStorage or cookies
    localStorage.removeItem("token");

    axios
      .get(`${baseUrl}/auth/logout`)
      .then((response) => {
        console.log("Logged out successfully", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed", error);
        alert("Logout failed, please try again.");
      });
  };

  return (
    <Button
      style={button}
      variant="contained"
      color="error"
      onClick={handleLogOut}
    >
      Logout
    </Button>
  );
};
