import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        axios.get('/api/auth/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setUser(response.data);
                setFormData({ name: response.data.name, email: response.data.email, password: '' });
            })
            .catch(error => console.error(error));
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put('/api/auth/profile', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Профиль обновлен');
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) return <p>Загрузка...</p>;

    return (
        <div>
            <h2>Профиль</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Новый пароль" onChange={handleChange} />
                <button type="submit">Обновить</button>
            </form>
        </div>
    );
};

export default Profile;
