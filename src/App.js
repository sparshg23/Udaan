import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Caportal from "./pages/caportal";
import Dashboard from "./pages/Dashboard";
// import LederBoard from "./pages/LeaderBoard";
import Auth from "./pages/Components/auth.js";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/dashboard/leaderboard" element={<LederBoard />} /> */}
        {/* <Route path="/login" element={<Caportal />} /> */}
        {/* <Route path="/register" element={<Auth />} /> */}
      </Routes>
        {/* <div className="h-0 w-full">
        <Caportal />

      </div> */}
      
      
    </>
  );
}

export default App;
