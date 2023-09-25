import { createSlice } from '@reduxjs/toolkit';
import { registerAsync, loginAsync, logoutAsync, fetchCurrentAsync } from './authApi';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(fetchCurrentAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
