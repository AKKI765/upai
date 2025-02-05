import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const storedCount = Number(localStorage.getItem("count")) || 0;
  const [count, setCount] = useState(storedCount);

  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const getUsername = () => {
    if (user?.email) {
      const username = user.email.split("@")[0]; 
      return username.charAt(0).toUpperCase() + username.slice(1); 
    }
    return "User";
  };

  
  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);


  const generateLineChartData = () => {
    const baseData = [0, 10, 17, 29, 37, 39, 35, 40, 55, 61, 55, 60];
    const newData = baseData.map((value) => value + count); 
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "User Activity",
          data: newData,
          fill: false,
          borderColor: "#4caf50",
          tension: 0.1,
          pointBackgroundColor: "#4caf50",
        },
      ],
    };
  };


  const generateBarChartData = () => {
    const baseData = [0, 10, 17, 29, 37, 39, 35, 40, 55, 61, 55, 60];
    const newData = baseData.map((value) => value + count); 
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Activity in Categories",
          data: newData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

 
  const generatePieChartData = () => {
    const active = 30 + count; 
    const inactive = 50 - count; 
    const pending = 20; 
    return {
      labels: ["Active", "Inactive", "Pending"],
      datasets: [
        {
          data: [active, inactive, pending],
          backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
          hoverOffset: 4,
        },
      ],
    };
  };

 
  const generateDoughnutChartData = () => {
    const completed = 40 + count; 
    const inProgress = 30 - count; 
    const notStarted = 30; 
    return {
      labels: ["Completed", "In Progress", "Not Started"],
      datasets: [
        {
          data: [completed, inProgress, notStarted],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          hoverOffset: 4,
        },
      ],
    };
  };

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Profile Trends",
      },
    },
  };

  
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <Box textAlign="center" p={5} className="dashboard-container">
      
      <Button
        variant="contained"
        className="back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>

     
      <Typography variant="h4" className="dashboard-title">Dashboard</Typography>
      <Typography variant="h6">Welcome back, {getUsername()}</Typography>
      <Typography variant="body1">
        This is your personalized dashboard.
      </Typography>

      
      <Box mt={4}>
        <Typography variant="h5">Counter: {count}</Typography>
        <div>
          <Button variant="contained" color="primary" onClick={handleIncrement} sx={{ m: 2 }}>
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDecrement} sx={{ m: 2 }}>
            Decrement
          </Button>
          <Button variant="contained" color="success" onClick={handleReset} sx={{ m: 2 }}>
            Reset
          </Button>
        </div>
      </Box>

     
      <div className="chart-container">
    
        <Box className="chart-box">
          <Typography variant="h6">User Activity Trend (Line Chart)</Typography>
          <Line data={generateLineChartData()} options={options} />
        </Box>

       
        <Box className="chart-box">
          <Typography variant="h6">Activity Breakdown (Bar Chart)</Typography>
          <Bar data={generateBarChartData()} options={options} />
        </Box>

    
        <Box className="chart-box">
          <Typography variant="h6">Activity Distribution (Pie Chart)</Typography>
          <Pie data={generatePieChartData()} options={options} />
        </Box>

       
        <Box className="chart-box">
          <Typography variant="h6">Activity Completion Status (Doughnut Chart)</Typography>
          <Doughnut data={generateDoughnutChartData()} options={options} />
        </Box>
      </div>
    </Box>
  );
};

export default Dashboard;
