import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/authApi/authApi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledRegisterForm = styled.form`
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

const Register = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAsync(credentials));
  };

  return (
    <div>
      <h2>Register</h2>
      <StyledRegisterForm onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={credentials.name} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </StyledRegisterForm>

      <p>Already have an account? <Link to="/login">Login here.</Link></p>
    </div>
  );
};

export default Register;
