import React from "react";
import { Route, NavLink } from 'react-router-dom';


function NavBar(){

    return (
		<div className="navbar">
			<NavLink
				className="navlink"
				to="/">
			</NavLink>
			<NavLink
				className="navlink"
				to="/cart">
				Your Cart
			</NavLink>
			<button
				className="logout-btn">
				Log Out
			</button>
		</div>
	);
}

export default NavBar