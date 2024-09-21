import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEmailStore, useError, usePasswordStore } from '../../store/LoginStore';
import { useEffect } from 'react';
import { validateEmail } from '../../utils/helper';
import axios from 'axios';

function Login() {
  const email = useEmailStore((state) => state.email);
  const setEmail = useEmailStore((state) => state.setEmail);

  const password = usePasswordStore((state) => state.password);
  const setPassword = usePasswordStore((state) => state.setPassword);

  const error = useError((state) => state.error);
  const setError = useError((state) => state.setError);

  const navigate = useNavigate(); // To navigate to another page after login

  useEffect(() => {
    console.log('Email:', email);
    console.log('password:', password);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid Email');
      return;
    }
    if (!password) {
      setError('Please enter the Password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      if (!response.data.error) {
        const { accessToken } = response.data;
        // Store the token in localStorage
        localStorage.setItem('token', accessToken);
        // Optionally, you can store user information if returned
        // localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to the AiTrack component or another protected route
        navigate('/aitrack');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };
  return (
    <>
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}className='input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
          <div className="password"></div>
          <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
          {error && <p className='text-red-500 text-xs pb-1 text-center'>{error}</p>}
          <button type='submit' className='btn-primary w-full text-sm bg-secondary text-white p-2 rounder my-1 hover:bg-yellow-300'>Login</button>
          <p className='text-sm text-center mt-4'>
            Not registered yet?
            <Link to="/signup" className='font-medium text-primary underline'>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
    </>   
  )
}

export default Login