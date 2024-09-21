import React from 'react'
import {useEmailStore,usePasswordStore,useName,useError} from '../../store/LoginStore'
import { useEffect } from 'react';
import { validateEmail } from '../../utils/helper';
import { Link } from 'react-router-dom'
import axios from 'axios';


function Signup() {
  const name = useName((state)=> state.name)
  const setName = useName((state)=> state.setName)

  const email = useEmailStore((state) => state.email);
  const setEmail = useEmailStore((state) => state.setEmail);

  const password = usePasswordStore((state) => state.password);
  const setPassword = usePasswordStore((state) => state.setPassword);

  const error = useError((state) => state.error);
  const setError = useError((state) => state.setError);

  useEffect(() => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("password:", password);
  }, [email,password,name]);

  const handleSignup = async(e) => {
    e.preventDefault();

    if(!validateEmail(email))
      {
        setError('Please Enter a valid Email')
      }
      if(!password)
        {
          setError('Please Enter the Password')
        }
      if(!email && !password)
      {
        setError('Please enter the email and password')
      }
      if(!name)
      {
        setError('Enter your name')
      }
  }
  return (
    <>
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl mb-7'>Signup</h4>
          <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}className='input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
          <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}className='input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
          <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}className='input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
          {error&&<p className='text-red-500 text-xs pb-1 text-center'>{error}</p>}
          <button type='submit' className='btn-primary w-full text-sm bg-secondary text-white p-2 rounder my-1 hover:bg-yellow-300'>Create Account</button>
          <p className='text-sm text-center mt-4'>
            Already have an account?
            <Link to="/login" className='font-medium text-primary underline'>Login</Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup