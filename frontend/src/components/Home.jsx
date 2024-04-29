import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./home.css"; // Import CSS file for styling

function Home({ loggedIn }) {
	const username = localStorage.getItem("username");
	const user_id = localStorage.getItem("user_id");
	const navigate = useNavigate();

	const [destinations, setDestinations] = useState([]);
	const [activities, setActivities] = useState([]);
	const [travelPlans, setTravelPlans] = useState([]);
	const [formData, setFormData] = useState({
		destination: "",
		activity: "",
		startDate: "",
		endDate: "",
	});





	const fetch_destinations = async () => {
		await fetch("http://127.0.0.1:5000/api/destinations")
			.then((res) => res.json())
			.then((data) => setDestinations(data));
	};

	const fetchall_activities = async () => {
		await fetch(`http://127.0.0.1:5000/api/activities/`)
			.then((res) => res.json())
			.then((data) => setActivities(data));
	};

	const fetch_travel_plans = async () => {
		await fetch(`http://127.0.0.1:5000/api/travelplan/${user_id}`)
			.then((res) => res.json())
			.then((data) => setTravelPlans(data));
	};

	console.log(travelPlans)

	const handleDestinationChange = (e) => {
		const chosenDestination = e.target.value;

		const single = destinations.find(
			(destination) => destination.location === chosenDestination
		);
		// console.log(single)

		const fetchone_activity = async () => {
			await fetch(`http://127.0.0.1:5000/api/activities/${single.id}`)
				.then((res) => res.json())
				.then((data) => setActivities(data));
		};

		fetchone_activity();
		handleChange(e);
		// console.log(activities)
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormData({
			...formData,
			[name]: value,
		});
		console.log(formData);
	};

	const handleSubmit = (e) => {
		if (loggedIn === false) {
			navigate("/login");
		} else if (loggedIn === true) {
			e.preventDefault();

				formData['user_id'] =user_id
				console.log(formData);

			const postData = async () => {
				await fetch("http://127.0.0.1:5000/api/travelplan", {
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						console.log(response);
						if (response.status === 201) {
							alert("Travel Plan Created Succsessfully!");
						} else {
							throw new Error("Failed to update travel plan");
						}
					})
					.catch((error) =>
						alert("Error updating travel plan:", error)
					);
			};

			if (formData.activity && formData.destination && formData.startDate && formData.endDate){
				postData();
				setFormData({
					destination: "",
					activity: "",
					startDate: "",
					endDate: "",
				});
			} else {
				alert('Please select an option from all fields')
			}
		}
	};

	useEffect(() => {
		fetch_destinations();
		fetchall_activities();
		fetch_travel_plans();
	}, []);
	return (
		<>
			<div className="search-container">
				{loggedIn === true ? (
					<h1 className="main-header">
						Welcome to VoyageEase, {username}{" "}
					</h1>
				) : (
					<h1 className="main-header">
						Welcome to VoyageEase, Traveler{" "}
					</h1>
				)}
				<h3 className="sub-header">Plan your next adventure!</h3>

				{/* Search Bar */}
				<div className="search-bar">
					{/* Destination */}
					<div className="search-box">
						<label htmlFor="destination">Destination</label>

						<select
							id="destination"
							name="destination"
							onChange={handleDestinationChange}>
							<option value="">Select Destination</option>
							{destinations.map((destination) => (
								<option
									key={destination.id}
									value={destination.location}>
									{destination.location}
								</option>
							))}
						</select>
					</div>

					{/* Activities */}
					<div className="search-box">
						<label htmlFor="activity">Activity</label>

						<select
							id="activity"
							name="activity"
							onChange={handleChange}>
							<option value="">Select Activity</option>
							{activities.map((activity) => (
								<option key={activity.id} value={activity.name}>
									{activity.name}, Cost: {activity.cost}
								</option>
							))}
						</select>
					</div>

					{/* Start Date */}
					<div className="search-box">
						<label htmlFor="startDate">Start Date</label>

						<input
							id="startDate"
							name="startDate"
							type="date"
							onChange={handleChange}
						/>
					</div>

					{/* End Date */}
					<div className="search-box">
						<label htmlFor="startDate">End Date</label>
						<input
							id="endDate"
							name="endDate"
							type="date"
							onChange={handleChange}
						/>
					</div>

					{/* Add Plan Button */}
					<button type="submit" onClick={handleSubmit}>
						Add Plan
					</button>
				</div>
			</div>

			{/* Display TravelPlans */}
			<div className="travel-plans">
				{loggedIn ? <h2>{username}'s Travel Plans:</h2> : null}
				{travelPlans.map((plan, index) => (
					<div key={index} className="plan-item">
						<h3>Trip {index +1}</h3>
						<span>Destination: {plan.destination}</span>
						<span>Activity Planned: {plan.activity}</span>
						<span>From: {plan.start_date}</span>
						<span>To: {plan.end_date}</span>
						{plan.description ? (
							<span>Description: {plan.description}</span>
						) : null}
					</div>
				))}
			</div>
		</>
	);
}

export default Home;
