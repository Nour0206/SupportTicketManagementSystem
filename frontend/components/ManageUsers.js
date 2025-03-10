import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/all');
                setUsers(response.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Manage Users</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user._id}>{user.name} - {user.email}</li>
                    ))
                ) : (
                    <li>No users found</li>
                )}
            </ul>
        </div>
    );
};

export default ManageUsers;
