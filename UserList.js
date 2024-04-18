import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import './App.css'; 

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <h1>User List</h1>
            {users.map(user => (
                <UserProfile key={user.id} userId={user.id} />
            ))}
        </div>
    );
};

export default UserList;
