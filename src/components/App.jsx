import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Contacts from '../pages/Contacts';
import Register from '../pages/Register';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/authApi/authSlice';
import Logout from './Logout/Logout';

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <Navigation isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={
            isAuthenticated ? (
              <Logout />
            ) : (
              <Navigate to="/home" /> 
            )
          }
        />
        <Route
          path="/contacts"
          element={
            isAuthenticated ? (
              <Contacts />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;
