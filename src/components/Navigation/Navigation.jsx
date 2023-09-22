import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../../redux/authApi/authApi';
import { Header, NavigationList, NavigationItem, NavigationLink, LogoutButton } from './Navigation.styled';

const Navigation = ({ isAuthenticated }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
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
