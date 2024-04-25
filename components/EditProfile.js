import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = ({ userId }) => {
    const [formData, setFormData] = useState({ name: '', email: '', bio: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/profile/${userId}`, formData);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            await axios.delete(`/api/profile/${userId}`);
            // Add logic for profile deletion
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Username" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
                <button type="submit">Update Profile</button>
            </form>
            <button className="profile delete-button" onClick={handleDelete}>Delete Profile</button>
        </div>
    );
};

export default EditProfile;
