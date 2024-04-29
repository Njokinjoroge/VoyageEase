import React, { useState, useEffect } from 'react'

export default function ManageTravel() {

	const username = localStorage.getItem("username");
	const user_id = localStorage.getItem("user_id");

    const [travelPlans, setTravelPlans] = useState([]);
    const [buttonIndex, setButtonIndex] = useState(null);
    const [activities, setActivities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [deleteButtonIndex, setDeleteButtonIndex] = useState(null);

    const [editedPlan, setEditedPlan] = useState({
        destination: "",
        activity: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    	


    const fetch_travel_plans = async () => {
        await fetch(`http://127.0.0.1:5000/api/travelplan/${user_id}`)
            .then((res) => res.json())
            .then((data) => setTravelPlans(data));
	};

    const fetch_destinations = async () => {
        await fetch("http://127.0.0.1:5000/api/destinations")
            .then((res) => res.json())
            .then((data) => setDestinations(data));
    };

    const getActivities =() => {
        if(buttonIndex === null){
            return
        }else{
            const chosenDestination = travelPlans[buttonIndex];
    
            const single = destinations.find(
                (destination) => destination.location === chosenDestination.destination
            );
            // console.log('my destination be: ', single)
    
            const fetchone_activity = async () => {
                await fetch(`http://127.0.0.1:5000/api/activities/${single.id}`)
                    .then((res) => res.json())
                    .then((data) => setActivities(data));
            };
            fetchone_activity()
        }    
   }

    const handleEdit = (index) => {
        setButtonIndex(index);
        console.log("You have clicked button index: ", index);
        console.log("Now the button index state has been set to: ", index);
    };    

    const handleCancel = () => {
        setButtonIndex(null);

        setEditedPlan({
            destination: "",
            activity: "",
            start_date: "",
            end_date: "",
            description: ""
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedPlan((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    console.log(editedPlan)

    const postData = async () => {
        if(!editedPlan.activity && !editedPlan.description && !editedPlan.startDate && !editedPlan.endDate){
            alert("Please enter data into at least one field!")
            return
        }

        await fetch(`http://127.0.0.1:5000/api/travelplan/${user_id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPlan),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                alert("Travel Plan Created Succsessfully!");
            } else {
               alert("Failed to update travel plan");
            }
        })
    };

        const handleDelete = (index) =>{
            setDeleteButtonIndex(index)

            const deleta = travelPlans[deleteButtonIndex]
            
            const deleteData = async () =>{
                await fetch(`http://127.0.0.1:5000/api/travelplan/${user_id}`, {
                    method : "DELETE",
                    body : JSON.stringify(deleta),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                }).then(response => {
                    if (response.status === 200) {
						alert("Travel Plan Deleted Succsessfully!");
					} else {
						alert("Failed to delete travel plan");
					}
                })
            }
            deleteData()
            
        }

        useEffect(() => {
			fetch_destinations();
			fetch_travel_plans();
            getActivities();

		}, [buttonIndex,fetch_travel_plans,getActivities]);
  return (
		<>
			{/* Display TravelPlans */}
			<div className="travel-plans">
				{user_id ? <h2>{username}'s Planned Trips:</h2> : null}
				{travelPlans.map((plan, index) => (
					<div key={index} className="plan-item">
						<h3>Trip Info</h3>
						<span>Destination: {plan.destination}</span>
						<span>Activity Planned: {plan.activity}</span>
						<span>From: {plan.start_date}</span>
						<span>To: {plan.end_date}</span>
						{plan.description ? (
							<span>Description: {plan.description}</span>
						) : null}

						<button onClick={() => handleEdit(index)}>Edit</button>
						<button  id='delete-button' onClick={() => handleDelete(index)}>Delete</button>

						{/* Edit form */}
						{buttonIndex === index && (
							<div className="edit-form">
								<h3>Edit Travel Plan</h3>
								<div className="activity-change">
									<label htmlFor="activity">
										Change Activity
									</label>
									<select
										id="activity"
										name="activity"
										onChange={(e) => handleEditChange(e)}>
										<option value="">
											Select Activity
										</option>
										{activities.map((activity) => (
											<option
												key={activity.id}
												value={activity.name}>
												{activity.name}, Cost:{" "}
												{activity.cost}
											</option>
										))}
									</select>{" "}
									<br />
								</div>
								<label htmlFor="startDate">
									{" "}
									Change Start Date
								</label>
								<input
									type="date"
									id="startDate"
									name="startDate"
									value={editedPlan.startDate}
									onChange={(e) => handleEditChange(e)}
								/>{" "}
								<br />
								<label htmlFor="startDate">
									{" "}
									Change End Date
								</label>
								<input
									type="date"
									id="endDate"
									name="endDate"
									onChange={(e) => handleEditChange(e)}
								/>{" "}
								<br />
								<label htmlFor="description">
									Add/Change Trip Description
								</label>
								<input
									type="text"
									id="description"
									name="description"
									onChange={(e) => handleEditChange(e)}
								/>{" "}
								<br />
								<button onClick={postData}>Update</button>
								<button
									id="cancel-button"
									onClick={handleCancel}>
									Cancel
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</>
  );
}
