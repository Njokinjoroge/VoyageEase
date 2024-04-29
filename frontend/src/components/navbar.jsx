import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import "./navbar.css";

function NavBar({ loggedIn, setLoggedIn }) {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.setItem('user_id', null)
		localStorage.setItem('username', null)
		setLoggedIn(false)
		navigate('/login')
	}

	return (
		<div className="navbar">
			<NavLink className="navlink" style={{ padding: 10 }} to="/">
				Home
			</NavLink>
			<NavLink className="navlink" style={{ padding: 10 }} to="/managetravel">
				Manage Trips
			</NavLink>

			<NavLink className="navlink" style={{ padding: 10 }} to="/profile">
				Your Profile
			</NavLink>
			{loggedIn === true ? (
				<button onClick={handleLogout}>Logout</button>
			) : (
				<button onClick={() => navigate("/login")}>Login</button>
			)}
		</div>
	);
}

export default NavBar