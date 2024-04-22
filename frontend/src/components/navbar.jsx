import React from "react";
import { NavLink } from 'react-router-dom';
import "./navbar.css";

function NavBar({ loggedIn }) {

	return (
		<div className="navbar">
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

			{loggedIn === true ? (
				<button>
					<NavLink
						className="loginlink"
						style={{ padding: 10 }}
						to="/login">
						Log Out
					</NavLink>
				</button>
			) : (
				<button>
					<NavLink
						className="loginlink"
						style={{ padding: 10 }}
						to="/login">
						Log in
					</NavLink>
				</button>
			)}
		</div>
	);
}

export default NavBar