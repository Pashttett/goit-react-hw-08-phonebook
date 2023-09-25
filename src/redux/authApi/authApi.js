import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com';

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = null;
};

const registerAsync = createAsyncThunk('auth/register', async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/users/signup`, credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isAuthenticated', 'true');
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Error registering. Please try again.');
  }
});

const loginAsync = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isAuthenticated', 'true');
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials. Please try again.');
  }
});

const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post(`${apiUrl}/users/logout`);
    clearAuthHeader();
    localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated', 'false');
  } catch (error) {
    throw new Error('Error logging out. Please try again.');
  }
});

const getCurrentUserAsync = createAsyncThunk('auth/currentUser', async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/current`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching current user. Please try again.');
  }
});

export { setAuthHeader, clearAuthHeader, registerAsync, loginAsync, logoutAsync, getCurrentUserAsync };
