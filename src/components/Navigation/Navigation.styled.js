import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #0a2e0a;
  color: white;
  padding: 10px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const NavigationItem = styled.li`
  margin: 0;
  padding: 0;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
`;

export { Header, NavigationList, NavigationItem, NavigationLink, LogoutButton };
