// frontend/src/components/TravelPlanForm.js

import React, { useState } from "react";
import axios from "axios";

const TravelPlanForm = () => {
	const [destination, setDestination] = useState("");
	const [date, setDate] = useState("");
	const [description, setDescription] =useState("")

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/travel_plans", {
				destination,
				date,
				description
			});
			alert("Travel plan created successfully!");
		} catch (error) {
			alert("Travel plan created successfully");
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
			<label for="description">Enter description: </label>
			<input
				type="text"
				placeholder="Description"
				// value={description}
				onChange={(e) => setDate(e.target.value)}
				id="description"
			/> <br/>
			<button type="submit">Create Travel Plan</button>
		</form>
	);
};

export default TravelPlanForm
