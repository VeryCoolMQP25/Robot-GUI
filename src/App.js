// App.js
import React from "react";
import ROSLIB from 'roslib';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Path from "./Path";  
import Start from "./Start";  

// using routes to navigate between pages
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Path/:room" element={<Path />} /> 
      </Routes>
    </Router>
  );
}

export default App;

