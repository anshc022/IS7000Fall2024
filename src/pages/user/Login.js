import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Login.css';
import {setAuthToken} from "./AuthToken";

async function loginUser(credentials) {
  const response = await axios.post('http://3.218.8.102/api/authenticate', credentials);
  const { id_token } = response.data;
  return id_token;
}

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    localStorage.setItem("token", token);
    setAuthToken(token);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <Link 
            to="/forgot-password" 
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <p>Don't have an account? {' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;