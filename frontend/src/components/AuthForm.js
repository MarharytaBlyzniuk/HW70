// src/components/AuthForm.js

import React, { useState } from 'react';
import axios from '../axios'; // Імпортуємо axios конфігурацію
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = type === 'register' ? '/api/auth/register' : '/api/auth/login';
            const response = await axios.post(url, formData);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');  // Переходимо на Dashboard після успішного входу/реєстрації
        } catch (err) {
            setError(err.response?.data?.message || 'Помилка сервера');
        }
    };

    return (
        <div>
            <h2>{type === 'register' ? 'Реєстрація' : 'Вхід'}</h2>
            <form onSubmit={handleSubmit}>
                {type === 'register' && (
                    <div>
                        <label htmlFor="name">Ім’я</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{type === 'register' ? 'Зареєструватися' : 'Увійти'}</button>
            </form>
        </div>
    );
};

export default AuthForm;
