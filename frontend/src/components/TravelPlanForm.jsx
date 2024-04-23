import React, { useState } from "react";
import axios from "axios";
import "./TravelPlanForm.css"; // Import the CSS file for styling
const TravelPlanForm = () => {
<<<<<<< HEAD
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
=======
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
            <label htmlFor="destination">Enter destination name: </label>
            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                id="destination"
            />{" "}
            <br />
            <label htmlFor="traveldate">Enter travel date: </label>
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
>>>>>>> 8a611e1 (Committing local changes to TravelPlanForm.jsx)
};

export default TravelPlanForm;
