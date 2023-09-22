import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Heading = styled.h2`
  font-size: 38px;
  transition: color 0.3s;

  &:hover {
    color: #004d00;
  }
`;

const Text = styled.p`
  font-size: 24px;
  transition: color 0.3s;

  &:hover {
    color: #004d00;
  }
`;

const Home = () => {
  return (
    <Container>
      <Heading>Welcome to the Phonebook App!</Heading>
      <Text>
        Please <Link to="/login">login</Link> to your account to add contacts.
      </Text>
    </Container>
  );
};

export default Home;
