import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com';

const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const registerAsync = createAsyncThunk('auth/register', async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/users/signup`, credentials);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Error registering. Please try again.');
  }
});

export const loginAsync = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, credentials);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials. Please try again.');
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post(`${apiUrl}/users/logout`);
    clearAuthHeader();
  } catch (error) {
    throw new Error('Error logging out. Please try again.');
  }
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
