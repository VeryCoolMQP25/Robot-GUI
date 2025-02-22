import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./Start";
import ExploreUnity from "./ExploreUnity"; 
import Floor4 from "./Floor4";  
import DestinationInput from "./DestinationInput";
import Path from "./Path";
import Home from "./Home";
import Speaker from "./Speaker";

// using routes to navigate between pages
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Path/:room" element={<Path />} /> 
        <Route path="/explore-unity" element={<ExploreUnity />} />
        <Route path="/destination-input" element={<DestinationInput />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/floor4" element={<Floor4 />} />

      </Routes>
    </Router>
  );
}

export default App;


