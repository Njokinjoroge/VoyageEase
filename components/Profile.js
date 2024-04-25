import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';
import ProfilePicture from './ProfilePicture';

const Profile = ({ userId }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/api/profile/${userId}`);
            setUser(response.data);
        };

        fetchUser();
    }, [userId]);

    return (
        <div className="profile">
            <ProfilePicture userId={userId} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.bio}</p>
            <EditProfile userId={userId} />
        </div>
    );
};

export default Profile;
