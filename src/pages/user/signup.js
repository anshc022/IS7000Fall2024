import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Sending registration data:', {
        login: formData.login,
        email: formData.email,
        password: formData.password,
        langKey: 'en'
      });

      const response = await axios({
        method: 'POST',
        url: 'http://3.218.8.102/api/register',
        data: {
          login: formData.login,
          email: formData.email,
          password: formData.password,
          langKey: 'en'
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });

      console.log('Registration response:', response);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError('Authorization required. Please check with administrator.');
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="login"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>Already have an account? {' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;