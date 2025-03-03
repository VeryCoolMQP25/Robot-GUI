import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./Start";
import ExploreUnity from "./ExploreUnity"; 
import Floor1 from "./Floor1";  
import Floor2 from "./Floor2";  
import Floor3 from "./Floor3";  
import Floor4 from "./Floor4";  
import Floor5 from "./Floor5";  
import DestinationInput from "./DestinationInput";
import Path from "./Path";


// using routes to navigate between pages
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/Path/:room" element={<Path />} /> 
        <Route path="/explore-unity" element={<ExploreUnity />} />
        <Route path="/destination-input" element={<DestinationInput />} />
        <Route path="/floor1" element={<Floor1 />} />
        <Route path="/floor2" element={<Floor2 />} />
        <Route path="/floor3" element={<Floor3 />} />
        <Route path="/floor4" element={<Floor4 />} />
        <Route path="/floor5" element={<Floor5 />} />

      </Routes>
    </Router>
  );
}

export default App;


