import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      {name,email,password}
    );
    console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="border shadow p-6 w-80 bg-white">
        <h2 className='text-2xl font-bold m-4'>Signup</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="name">Name</label>
            <input type="text"
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-3 border'
            id="name" name="name" placeholder='enter name' required/>
        </div>
        <div className='mb-4'>
            <label htmlFor="email">Email</label>
            <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-3 border' 
            id="email" name="email" placeholder='enter email' required/>
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border'
            id="password" name="password" placeholder='enter password'/>
        </div>
        <div className="mb-4">
        <button type='submit' 
        className='w-full bg-teal-600 text-white py-2'>
            Signup</button>
            <p className="text-senter">
                Already have accont? <a href="">Login</a>
            </p>
        </div>
      </form>
        </div>

    </div>
  )
}

export default Signup
