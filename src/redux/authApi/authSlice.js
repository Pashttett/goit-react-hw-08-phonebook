import { createSlice } from '@reduxjs/toolkit';
import { registerAsync, loginAsync, logoutAsync, getCurrentUserAsync } from './authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.error.message;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.error.message;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.error.message;
      });
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;

