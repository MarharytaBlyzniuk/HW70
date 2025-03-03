// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get('/api/users/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserData();
    }, []);

    if (!userData) {
        return <p>Завантаження...</p>;
    }

    return (
        <div>
            <h2>Ласкаво просимо, {userData.name}</h2>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default Dashboard;
