import React, { useState } from "react";
import "./home.css"; // Import CSS file for styling

// Destinations data with activities
const destinationsData = [
	{
		id: 1,
		country: "France",
		name: "Eiffel Tower",
		date: "04/18/2024",
		activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
	},
	{
		id: 2,
		country: "USA",
		name: "Statue of Liberty",
		date: "04/18/2024",
		activities: ["Statue of Liberty", "Central Park", "Times Square"],
	},
	{
		id: 3,
		country: "Japan",
		name: "Tokyo Tower",
		date: "04/18/2024",
		activities: ["Tokyo Tower", "Senso-ji Temple", "Shibuya Crossing"],
	},
	{
		id: 4,
		country: "Italy",
		name: "Colosseum",
		date: "04/18/2024",
		activities: ["Colosseum Tour", "Roman Forum", "Trevi Fountain"],
	},
	{
		id: 5,
		country: "England",
		name: "Big Ben",
		date: "04/18/2024",
		activities: ["Big Ben Tour", "British Museum", "Buckingham Palace"],
	},
	{
		id: 6,
		country: "Australia",
		name: "Sydney Opera House",
		date: "04/18/2024",
		activities: [
			"Opera House Tour",
			"Sydney Harbour Bridge Climb",
			"Bondi Beach",
		],
	},
	{
		id: 7,
		country: "Spain",
		name: "Sagrada Família",
		date: "04/18/2024",
		activities: ["Sagrada Família Tour", "Park Güell", "Barcelona Beach"],
	},
	{
		id: 8,
		country: "China",
		name: "Great Wall of China",
		date: "04/18/2024",
		activities: ["Great Wall Tour", "Forbidden City", "Terracotta Army"],
	},
	{
		id: 9,
		country: "India",
		name: "Taj Mahal",
		date: "04/18/2024",
		activities: ["Taj Mahal Tour", "Agra Fort", "Jaipur City Palace"],
	},
	{
		id: 10,
		country: "Brazil",
		name: "Christ the Redeemer",
		date: "04/18/2024",
		activities: [
			"Christ the Redeemer Tour",
			"Sugarloaf Mountain",
			"Copacabana Beach",
		],
	},
	{
		id: 11,
		country: "Egypt",
		name: "Pyramids of Giza",
		date: "04/18/2024",
		activities: ["Pyramids Tour", "Egyptian Museum", "Nile River Cruise"],
	},
	{
		id: 12,
		country: "Germany",
		name: "Neuschwanstein Castle",
		date: "04/18/2024",
		activities: ["Castle Tour", "Marienbrücke", "Alps Hiking"],
	},
	{
		id: 13,
		country: "Russia",
		name: "Saint Basil's Cathedral",
		date: "04/18/2024",
		activities: ["Cathedral Tour", "Red Square", "Hermitage Museum"],
	},
	{
		id: 14,
		country: "Kenya",
		name: "Maasai Mara National Reserve",
		date: "04/18/2024",
		activities: ["Safari", "Hot Air Balloon Ride", "Visit Maasai Village"],
	},
	{
		id: 15,
		country: "South Africa",
		name: "Kruger National Park",
		date: "04/18/2024",
		activities: ["Safari", "Table Mountain", "Robben Island"],
	},
	{
		id: 16,
		country: "Morocco",
		name: "Marrakech Medina",
		date: "04/18/2024",
		activities: ["Medina Tour", "Jardin Majorelle", "Hassan II Mosque"],
	},
];

// Function to filter destinations based on search term
const filterDestinationsByCountry = (searchTerm) => {
	return destinationsData.filter((destination) =>
		destination.country.toLowerCase().includes(searchTerm.toLowerCase())
	);
};

// Function to filter activities based on selected destination
const filterActivitiesByDestination = (destinationId) => {
	const destination = destinationsData.find(
		(dest) => dest.id === parseInt(destinationId)
	);
	return destination ? destination.activities : [];
};

function Home() {
	const [selectedCountry, setSelectedCountry] = useState(""); // Selected country
	const [selectedDestination, setSelectedDestination] = useState(""); // Selected destination
	const [selectedActivity, setSelectedActivity] = useState(""); // Selected activity
	const [startDate, setStartDate] = useState(""); // Start date
	const [adults, setAdults] = useState(1); // Number of adults
	const [children, setChildren] = useState(0); // Number of children
	const [travelPlans, setTravelPlans] = useState([]); // List of travel plans

	// Function to handle changes in the selected country input
	const handleCountryChange = (e) => {
		setSelectedCountry(e.target.value);
	};

	// Function to handle changes in the selected destination input
	const handleDestinationChange = (e) => {
		setSelectedDestination(e.target.value);
	};

	// Function to handle changes in the selected activity input
	const handleActivityChange = (e) => {
		setSelectedActivity(e.target.value);
	};

	// Function to handle changes in the start date input
	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	// Function to handle changes in the number of adults input
	const handleAdultChange = (value) => {
		setAdults(value);
	};

	// Function to handle changes in the number of children input
	const handleChildrenChange = (value) => {
		setChildren(value);
	};

	// Function to add the selected destination to the list of travel plans
	const handleAddPlan = () => {
		const newPlan = {
			country: selectedCountry,
			destination: selectedDestination,
			activity: selectedActivity,
			startDate: startDate,
			adults: adults,
			children: children,
		};
		setTravelPlans([...travelPlans, newPlan]);
	};

	// Function to remove a travel plan from the list
	const handleRemovePlan = (index) => {
		const updatedPlans = [...travelPlans];
		updatedPlans.splice(index, 1);
		setTravelPlans(updatedPlans);
	};

	// Filter destinations based on selected country
	const filteredDestinations = filterDestinationsByCountry(selectedCountry);

	// Filter activities based on selected destination
	const activities = selectedDestination
		? filterActivitiesByDestination(selectedDestination)
		: [];

		return (
		<div className="container">
			<h1>Welcome to VoyageEase</h1>
			<h3>Plan your next adventure!</h3>

			{/* Search Bar */}
			<div className="search-bar">
				{/* Country */}
				<div className="search-box">
					<label htmlFor="country">Select Country</label>
					<select
						id="country"
						onChange={handleCountryChange}>
						<option value="">Select Country</option>
						{destinationsData.map((destination) => (
							<option
								key={destination.id}
								value={destination.country}>
								{destination.country}
							</option>
						))}
					</select>
				</div>

				{/* Destination */}
				<div className="search-box">
					<label htmlFor="destination">Select Destination</label>
					<select
						id="destination"
						onChange={handleDestinationChange}>
						<option value="">Select Destination</option>
						{filteredDestinations.map((destination) => (
							<option
								key={destination.id}
								value={destination.id}>
								{destination.name}
							</option>
						))}
					</select>
				</div>

				{/* Activity */}
				{selectedDestination && (
					<div className="search-box">
						<label htmlFor="activity">Select Activity</label>
						<select
							id="activity"
							onChange={handleActivityChange}>
							<option value="">Select Activity</option>
							{activities.map((activity) => (
								<option
									key={activity}
									value={activity}>
									{activity}
								</option>
							))}
						</select>
					</div>
				)}

				{/* Start Date */}
				<div className="search-box">
					<label htmlFor="startDate">Start Date</label>
					<input
						id="startDate"
						type="date"
						value={startDate}
						onChange={handleStartDateChange}
					/>
				</div>

				{/* Travelers */}
				<div className="search-box-travelers-section">
					<label htmlFor="travelers">Travelers:</label>
					<div className="travelers-dropdown">
						<select
							value={adults}
							onChange={(e) => handleAdultChange(e.target.value)}>
							{[...Array(10)].map((_, i) => (
								<option
									key={i}
									value={i + 1}>{`${i + 1} Adult${
									i !== 0 ? "s" : ""
								}`}</option>
							))}
						</select>
						<select
							value={children}
							onChange={(e) =>
								handleChildrenChange(e.target.value)
							}>
							{[...Array(10)].map((_, i) => (
								<option
									key={i}
									value={i}>{`${i} Child${
									i !== 1 ? "ren" : ""
								}`}</option>
							))}
						</select>
					</div>
				</div>

				{/* Add Plan Button */}
				<button onClick={handleAddPlan}>Add Plan</button>
			</div>

			{/* Selected Destinations */}
			<div className="selected-destinations">
				<h2>Travel Plans:</h2>
				{travelPlans.map((plan, index) => (
					<div
						key={index}
						className="plan-item">
						<span>{plan.country}</span>
						<span>{plan.destination}</span>
						<span>{plan.activity}</span>
						<span>{plan.startDate}</span>
						<span>Adults: {plan.adults}</span>
						<span>Children: {plan.children}</span>
						<button onClick={() => handleRemovePlan(index)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default Home;
