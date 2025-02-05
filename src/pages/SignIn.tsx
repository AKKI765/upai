import React, { useState } from "react";
import { signInWithGoogle } from "../firebaseConfig";
import { Button, Box, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/"; 
    }
  };

  const handleEmailSignIn = () => {
    
    if (email === "user@example.com" && password === "password123") {
      localStorage.setItem("user", JSON.stringify({ name: "User", email }));
      window.location.href = "/"; 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box className="signin-container">
      <Box className="signin-card">
        <Typography variant="h4" className="signin-title">
          Sign In
        </Typography>
        <Button
          variant="contained"
          className="signin-google-button"
          onClick={handleSignIn}
        >
          Sign in with Google
        </Button>
        <Typography variant="h6" className="signin-email-title">
          Or sign in with email
        </Typography>
        <TextField
          className="signin-textfield"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          className="signin-textfield"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          className="signin-email-button"
          onClick={handleEmailSignIn}
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Sign in
        </Button>
        <Typography variant="body2" className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
