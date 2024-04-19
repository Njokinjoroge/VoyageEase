import React from "react";
import { NavLink } from 'react-router-dom';


function NavBar(){

    return (
		<>
			<NavLink
				className="navlink"
				style={{ padding: 10 }}
				to="/">
				Home
			</NavLink>
			<NavLink
				className="navlink"
				style={{ padding: 10 }}
				to="/profile">
				Your Profile
			</NavLink>
			<NavLink
				className="navlink"
				style={{ padding: 10 }}
				to="/create">
				Travel Planning{" "}
			</NavLink>
			<NavLink
				className="navlink"
				style={{ padding: 10 }}
				to="/signup">
				SignUp
			</NavLink>
			<NavLink
				className="navlink"
				style={{ padding: 10 }}
				to="/login">
				Login
			</NavLink>
		</>
	);
}

export default NavBar