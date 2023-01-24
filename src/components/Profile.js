import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from '../StateContext';
import { useEffect } from 'react';
import LoadingModal from './LoadingModal';

const Profile = () => {

  const { updatePassword, response, setRes, setShowLoading } = useStateContext()

  useEffect(()=>{
    setShowLoading(false)
    setRes()
  }, [])

    const [ formData, setFormData ] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }
  
    const handleSubmit = async (event)=>{
        event.preventDefault();
    
        // Validate the form data
        const newErrors = {};
        if (formData.newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters long';
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
          newErrors.confirmNewPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
  
        // If there are no errors, submit the form data
        if (Object.keys(newErrors).length === 0) {
          setShowLoading(true)
          // Submit the form data here
          await updatePassword(event)
          let inputs = document.querySelectorAll("input")
          inputs.forEach((input) => (input.value = ""))
        }
      }

  return (
      <form className=' min-w-full duration-500'>
        <LoadingModal/>
    <div className="h-fit flex items-center justify-start w-full">
  <div className="max-w-screen-md mx-auto">
    <div>
      <div className=" bg-transparent rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600 mt-8">
            <p className="font-medium text-lg">Security Details</p>
            <p>Edit and Update your password</p>
          </div>

          <div className="lg:col-span-2 mt-8">
              {
                response && (
                  <p className="text-red-500 font-semibold text-xs mb-6">{response}</p>
                )
              }
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label>New Password</label>
                <input 
                value={response? '':formData.newPassword} 
                onChange={handleChange}
                required
                type="password" 
                name="newPassword"  
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs font-semibold">{errors.newPassword}</p>
              )}

              <div className="md:col-span-3">
                <label>Confirm New Password</label>
                <input 
                value={response? '':formData.confirmNewPassword}
                onChange={handleChange}
                id='password'
                name='confirmNewPassword'
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                type="password"
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs font-semibold">{errors.confirmNewPassword}</p>
              )}

            </div>

            <div className='flex mt-10 gap-28'>
                <Link to={"/layout/items"}>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Back</button>
                </div>
              </div>
                </Link>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button 
                  type='submit' 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={e=>{
                    handleSubmit(e)
                  }}
                  >Update</button>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</form>
  )
}

export default Profile