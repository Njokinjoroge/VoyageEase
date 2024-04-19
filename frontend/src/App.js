import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravelPlanForm from "./components/TravelPlanForm";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import NavBar from "./components/navbar";

function App() {
	return (
		<>
		<NavBar />
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/create"
					element={<TravelPlanForm />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
				<Route
					path="/profile"
					element={<Profile/>}
				/>
			</Routes>
		</Router>
		</>
	);
}
export default App
