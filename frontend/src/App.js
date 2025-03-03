// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Головна сторінка</h1>} />
                <Route path="/login" element={<AuthForm type="login" />} />
                <Route path="/register" element={<AuthForm type="register" />} />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
