import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import "./Counter.css";

const Counter: React.FC = () => {
  const navigate = useNavigate(); 

  
  const storedCount = Number(localStorage.getItem("count")) || 0;
  const [count, setCount] = useState(storedCount);

 
  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

 
  const backgroundColor = useSpring({
    background: `rgba(0, 0, 255, ${Math.min(count / 10, 1)})`, 
    config: { tension: 170, friction: 26, precision: 0.01 },
    from: { background: `rgba(0, 0, 255, 0)` }, 
  });

  return (
    <animated.div
      style={{
        ...backgroundColor, 
      }}
      className="counter-container"
    >
      <Typography variant="h4" className="counter-title">Counter: {count}</Typography>
      
      <div className="button-container">
       
        <div className="primary-buttons">
          <Button
            variant="contained"
            className="counter-button primary"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            className="counter-button primary"
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </Button>
        </div>

     
        <Button
          variant="contained"
          className="counter-button fail"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>

        
      </div>

     
      <Button
          variant="contained"
          className="counter-button home"
          onClick={() => navigate("/")} 
        >
          Back to Home
        </Button>
    </animated.div>
  );
};

export default Counter;
