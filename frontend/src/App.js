import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravelPlanForm from "./components/TravelPlanForm";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import NavBar from "./components/navbar";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import "./App.css"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)


  const getId = () =>
    {    
      try{
          const user_id =localStorage.getItem('user_id')
          console.log(user_id)
          if(user_id !== 'null'){
            setLoggedIn(true)
          }
        } catch{
          console.log('failed')
        }
      }

    useEffect(() => {
      getId()
    } ,[])



  return (
    <div className="App">
      <Router>
        <NavBar loggedIn={loggedIn} setLoggedIn= {setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="/login" element={<LogIn loggedIn= {loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<TravelPlanForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
