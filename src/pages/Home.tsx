import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import "./Home.css";  

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);  
    navigate("/");  
  };

 
  const getUsername = () => {
    if (user?.name) return user.name.toUpperCase(); 
    if (user?.email) return user.email.split("@")[0].toUpperCase(); 
    return "USER"; 
  };

  return (
    <Box className="home-container">
      {/* Navbar */}
      <Box className="navbar">
        <Typography variant="h5" className="logo">U.@i</Typography>
        <Typography variant="h6" className="welcome">
          {user ? `WELCOME, ${getUsername()}` : ""}
        </Typography>
        {user ? (
          <Button variant="contained" color="secondary" onClick={handleSignOut} className="auth-btn">
            Sign Out
          </Button>
        ) : (
          <Button variant="contained" color="primary" component={Link} to="/signin" className="auth-btn">
            Sign In
          </Button>
        )}
      </Box>

      
      {user ? (
        <Box className="nav-buttons">
          <Button variant="contained" color="primary" className="home-button" component={Link} to="/counter">
            Go to Counter
          </Button>
          <Button variant="contained" color="secondary" className="home-button secondary" component={Link} to="/form">
            Fill User Form
          </Button>
          <Button variant="contained" color="success" className="home-button" component={Link} to="/editor">
            Text Editor
          </Button>
          <Button variant="contained" color="info" className="home-button info" component={Link} to="/dashboard">
            View Dashboard
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" className="sign-in-message">
          <h1>WELCOME TO THE HOME PAGE </h1>
          <h3>Please sign in to access more features.</h3>
        </Typography>
      )}
    </Box>
  );
};

export default Home;
