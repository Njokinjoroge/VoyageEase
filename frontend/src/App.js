import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravelPlanForm from "./components/TravelPlanForm";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import NavBar from "./components/navbar";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<TravelPlanForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
