// frontend/src/components/TravelPlanForm.js

import React, { useState } from "react";
import axios from "axios";

const TravelPlanForm = () => {
	const [destination, setDestination] = useState("");
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://127.0.0.1:5000/api/travel_plans", {
				destination,
				date,
			});
			console.log("Travel plan created successfully!");
		} catch (error) {
			console.error("Error creating travel plan:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label for="destination">Enter destination name: </label>
			<input
				type="text"
				placeholder="Destination"
				value={destination}
				onChange={(e) => setDestination(e.target.value)}
				id="destination"
			/>{" "}
			<br />
			<label for="traveldate">Enter travel date: </label>
			<input
				type="date"
				placeholder="Date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				id="traveldate"
			/>
			<br />
			<button type="submit">Create Travel Plan</button>
		</form>
	);
};

export default TravelPlanForm
