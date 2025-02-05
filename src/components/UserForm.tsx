import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UserForm.css"; 

const UserForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    userId: "",
  });
  const [unsaved, setUnsaved] = useState(false);

  
  const generateUserId = () => {
    return `USER${Math.floor(Math.random() * 1000000000)}`; 
  };

  
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData); 
    }
  }, []);

 
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsaved) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsaved]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setUnsaved(true); 
  };

  const handleSubmit = () => {
    const generatedId = generateUserId(); 
    const updatedUser = { ...user, userId: generatedId };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser)); 
    setUnsaved(false);
    alert("User data saved!");
  };

  return (
    <Box className="form-page">
      
      <Button
        variant="contained"
        className="back-button"
        onClick={() => navigate("/")} 
      >
        Back to Home
      </Button>

      <Box className="form-container">
        <div className="form-wrapper">
          <Typography variant="h6" className="title">Create User</Typography>

        
          <div className="user-id">
            User ID: {user.userId || "------"}
          </div>

         
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="text-field"
          />
          <TextField
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="text-field"
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="text-field"
          />
          <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="text-field"
          />

          
          <Button
            className="save-button"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default UserForm;
