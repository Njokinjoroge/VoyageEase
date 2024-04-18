import React from "react";
import { useNavigate, NavLink } from 'react-router-dom';


function NavBar(){

	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/login')
	}

    return (
		<div className="navbar">
			<NavLink
				className="navlink"
				to="/"
				style={{ padding: 10 }}>
				Home
			</NavLink>
			<NavLink
				className="navlink"
				to="/login"
				style={{ padding: 10 }}>
				Login
			</NavLink>
			<NavLink
				className="navlink"
				to="/register"
				style={{ padding: 10 }}>
				Register
			</NavLink>
			
			<button className="logout-btn" onClick={handleClick()}>Log Out</button>
		</div>
	);
}

export default NavBar