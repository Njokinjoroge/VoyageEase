import React, { useState, useEffect } from "react";
import "./home.css"; // Import CSS file for styling



function Home() {

    const [destinations, setDestinations] = useState([])
    const [activities, setActivities] = useState([])

    
    useEffect(() => {
        fetch_destinations()
        fetchall_activities()
    }, [])


    const fetch_destinations = async ()=> {
            await fetch("http://127.0.0.1:5000/destinations")
            .then(res => res.json())
            .then(data => setDestinations(data))
        }

    const fetchall_activities = async () => {
        await fetch(`http://127.0.0.1:5000/activities/`)
        .then(res => res.json())
        .then(data => setActivities(data))
    }
        
    // console.log(destinations)
    
    const handleDestinationChange =(e) => {
        const chosenDestination = e.target.value

        const single = destinations.find(destination => destination.location === chosenDestination)
        // console.log(single)

        const fetchone_activity = async () => {
            await fetch(`http://127.0.0.1:5000/activities/${single.id}`)
                .then((res) => res.json())
                .then((data) => setActivities(data));
        };

        fetchone_activity()
        // console.log(activities)
    }





    return (
		<>
			<div className="search-container">
				<h1 className="main-header">Welcome to VoyageEase</h1>
				<h3 className="sub-header">Plan your next adventure!</h3>

				{/* Search Bar */}
				<div className="search-bar">

					{/* Destination */}
					<div className="search-box">
						<label htmlFor="destination">Destination</label>
						<select id="destination" onChange={handleDestinationChange}>
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
						<select id="activity">
							<option value="">Select Activity</option>
							{activities.map((activity) => (
								<option key={activity.id} value={activity.id}>
									{activity.name}, Cost: {activity.cost}
								</option>
							))}
						</select>
					</div>

					{/* Start Date */}
					<div className="search-box">
						<label htmlFor="startDate">Start Date</label>
						<input id="startDate" type="date" />
					</div>

					{/* End Date */}
					<div className="search-box">
						<label htmlFor="startDate">End Date</label>
						<input id="endtDate" type="date" />
					</div>

				</div>
			</div>
		</>
	);
}

export default Home;
