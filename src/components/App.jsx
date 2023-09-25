import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthHeader } from '../redux/authApi/authApi';
import { getCurrentUserAsync } from '../redux/authApi/authApi';
import { selectIsAuthenticated } from '../redux/authApi/authSlice';
import Login from '../pages/Login';
import Navigation from './Navigation/Navigation';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';
import Register from '../pages/Register';
import { Provider } from 'react-redux';
import store from '../redux/store';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthHeader(token);
      dispatch(getCurrentUserAsync());
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div>
        <Navigation isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/contacts" element={isAuthenticated ? <Contacts /> : <Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
