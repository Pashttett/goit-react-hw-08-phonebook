import React from 'react';
import { useDispatch } from 'react-redux';
import { Header, NavigationList, NavigationItem, NavigationLink, LogoutButton } from './Navigation.styled';
import { logoutAsync } from '../../redux/authApi/authApi';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <Header>
      <NavigationList>
        <NavigationItem>
          <NavigationLink to="/">Home</NavigationLink>
        </NavigationItem>
        {isAuthenticated && (
          <>
            <NavigationItem>
              <NavigationLink to="/contacts">Contacts</NavigationLink>
            </NavigationItem>
            <NavigationItem>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </NavigationItem>
          </>
        )}
        {!isAuthenticated && (
          <NavigationItem>
            <NavigationLink to="/login">Login</NavigationLink>
          </NavigationItem>
        )}
      </NavigationList>
    </Header>
  );
};

export default Navigation;
