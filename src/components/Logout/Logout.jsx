import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../../redux/authApi/authApi';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
