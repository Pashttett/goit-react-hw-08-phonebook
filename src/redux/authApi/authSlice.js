import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, fetchCurrentAsync, logoutAsync } from './authApi';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const getToken = () => localStorage.getItem('token');

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;

        localStorage.setItem('token', action.payload.token);
      })
      .addCase(fetchCurrentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;

        localStorage.removeItem('token');
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
