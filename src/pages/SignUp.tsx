import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
      window.location.href = "/"; 
    } else {
      alert("Please provide valid credentials");
    }
  };

  return (
    <Box className="signup-container">
      <Box className="signup-card">
        <Typography variant="h4" className="signup-title">
          Sign Up
        </Typography>
        <div>
          <TextField
            className="signup-textfield"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className="signup-textfield"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            fullWidth
            className="signup-btn"
          >
            Sign Up
          </Button>
        </div>
        <div className="signup-link" style={{ marginTop: "20px" }}>
          <Typography variant="body2">
            Already have an account? <Link to="/signin">Sign In</Link>
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default SignUp;
