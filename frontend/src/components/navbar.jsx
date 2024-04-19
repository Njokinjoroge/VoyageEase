import React from "react";
import { NavLink } from 'react-router-dom';


function NavBar(){

    return(
        <>
            <NavLink className="navlink" to="/">Home</NavLink>
            <NavLink className="navlink" to="/profile">Your Profile</NavLink>
            <NavLink className="navlink" to="/create">Travel Planning </NavLink>
        </>
    )
}

export default NavBar