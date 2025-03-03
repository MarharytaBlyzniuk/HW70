import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        return [];
    }
};
import React from 'react';
import UserList from '../components/UserList';

function App() {
    return (
        <div>
            <h1>Пользователи</h1>
            <UserList />
        </div>
    );
}

export default App;
