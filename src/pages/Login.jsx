import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectAuthError } from '../redux/authApi/authApi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 18px;
    width: 300px;
    margin: auto;
  }

  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 14px;
    outline: none;
    width: 100%;
  }

  button {
    padding: 12px 12px;
    font-size: 16px;
    color: #fff;
    background-color: #006400;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    outline: none;
    width: 200px;
    transition: background-color 0.3s;
    margin: auto;
  }

  button:hover {
    background-color: #004d00;
  }

  button:focus {
    background-color: #003366;
  }

  button:active {
    background-color: #800000;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const authError = useSelector(selectAuthError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginAsync(credentials));
      navigate('/contacts');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <StyledLoginForm onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </StyledLoginForm>

      {authError && <p style={{ color: 'red' }}>{authError}</p>}

      <p>
        Don't have an account? <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
};

export default Login;
