import React, { Routes, Route } from "react";
import NavBar from "./components/navbar";
import LoginPage from "./components/login";
import RegistrationPage from "./components/register";
import HomePage from "./components/home";


function App() {

	return (
		<>
				{/* <Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/register"
						element={<RegistrationPage />}
					/> */}
				</Routes>
      <LoginPage />
      <RegistrationPage />
      <HomePage />
    
		</>
	)
}

export default App;
