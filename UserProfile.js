import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/user/${userId}`);
            setUser(response.data);
        };
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/user/${userId}`, formData);
            setUser(formData); // Update user state with new data
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            await axios.delete(`/user/${userId}`);
            // Handle deletion, e.g., redirect to a different page
        }
    };

    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <img src={user.profile_pic} alt="Profile" />
            {isEditing ? (
                <div className="edit-profile-form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name || user.name} onChange={handleChange} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email || user.email} onChange={handleChange} />
                    {/* Add more fields as needed */}
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Email: {user.email}</p>
                    <button onClick={() => setIsEditing(true)}>Update Profile</button>
                </div>
            )}
            <button onClick={handleDelete}>Delete Profile</button>
        </div>
    );
};

export default UserProfile;
