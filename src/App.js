import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./Start";
import ExploreUnity from "./ExploreUnity"; 
import Floor4 from "./Floor4";  
import DestinationInput from "./DestinationInput";
import Path from "./Path";

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


