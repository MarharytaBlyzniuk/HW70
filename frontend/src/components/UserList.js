import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
