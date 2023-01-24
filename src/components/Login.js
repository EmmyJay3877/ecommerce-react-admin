import React from 'react'
import { useStateContext } from '../StateContext';
import { useState } from 'react'
import { useEffect } from 'react';
import LoadingIcon from './LoadingIcon'

const Login = () => {

  const { response, login, setRes, setShowLoading, showLoading } = useStateContext()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    setShowLoading(false)
    setRes()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async(event) => {
    event.preventDefault()

    const newErrors = {}
    if (formData.password.length === 0) {
      newErrors.password = 'This feild is required';
    }
    if (formData.email.length === 0) {
      newErrors.email = 'This feild is required';
    }
    setErrors(newErrors);

    // If there are no errors, submit the form data
    if (Object.keys(newErrors).length === 0) {
      setShowLoading(true)
      // Submit the form data here
      await login(event)
      setFormData({email: '', password: ''})
      let inputs = document.querySelectorAll("input")
      inputs.forEach((input) => (input.value = ""))
      }
  }

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen bg-gray-200 text-gray-700 overflow-hidden">

    <h1 className="font-bold text-3xl mt-24">Admin</h1>
    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-4 overflow-hidden">
        {
          response && (
            <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
          )
        }
      <label className="font-semibold text-xs" >Email</label>
      <input 
      name='email'
      value={formData.email}
      onChange={handleChange}
      id='email'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
      type="text"
      />
      {errors.email && (
          <p className="text-red-500 flex font-semibold text-xs">{errors.email}</p>
      )}
      <label className="font-semibold text-xs mt-3" >Password</label>
      <input 
      value={formData.password}
      onChange={handleChange}
      id='password'
      name='password'
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
      type="password"
      />
      {errors.password && (
          <p className="text-red-500 flex font-semibold text-xs mt-2">{errors.password}</p>
      )}
      <button 
      className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      onClick={(e) => {
        handleSubmit(e)
      }}
      type='submit'
      >{showLoading===true ? <LoadingIcon/> : 'Login'}</button>
      <div className="flex mt-6 justify-center text-xs">
        <a href='http://localhost:3000/forgetpassword/' className="text-blue-400 hover:text-blue-500">Forgot Password</a>
      </div>
    </form>
  
  </div>
  )
}

export default Login