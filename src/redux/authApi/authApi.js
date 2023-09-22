import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const registerAsync = createAsyncThunk('auth/register', async (credentials) => {
  try {
 const response = await axios.post('/users/register', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Error registering. Please try again.');
  }
});

export const loginAsync = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials. Please try again.');
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.post('/users/logout');
    return response.data;
  } catch (error) {
    throw new Error('Error logging out. Please try again.');
  }
});

export const fetchCurrentAsync = createAsyncThunk('auth/fetchCurrentUser', async () => {
  try {
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data. Please try again.');
  }
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
