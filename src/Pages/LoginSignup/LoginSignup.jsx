import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        let user = formData.email.slice(0,10);
        localStorage.setItem('email',formData.email);
        localStorage.setItem('user',user);
        window.location.replace('/');
      } else {
        setError(responseData.errors);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user',formData.username);
        localStorage.setItem('email',formData.email);
        window.location.replace('/');
      } else {
        setError(responseData.errors);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button
          onClick={() => {
            state === 'Login' ? login() : signup();
          }}
          className="loginsignup-btn"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Continue'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {state === 'Sign Up' ? (
          <p className="loginsignup-login">
            Already have an account?{' '}
            <span onClick={() => setState('Login')}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{' '}
            <span onClick={() => setState('Sign Up')}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;




