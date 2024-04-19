// frontend/src/components/TravelPlanForm.js

import React, { useState } from "react";
import axios from "axios";

const TravelPlanForm = () => {
	const [destination, setDestination] = useState("");
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/api/travel_plans", { destination, date });
			console.log("Travel plan created successfully!");
		} catch (error) {
			console.error("Error creating travel plan:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Destination"
				value={destination}
				onChange={(e) => setDestination(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button type="submit">Create Travel Plan</button>
		</form>
	);
};

export default TravelPlanForm
