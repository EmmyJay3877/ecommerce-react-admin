import React from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../StateContext'

const Notification = () => {

  const { getNotification, notification, resetNotificationCount}  = useStateContext()

  useEffect(()=>{
    getNotification()
    resetNotificationCount()
  }, [])

  return (
    <div className='m-10 w-auto h-screen flex justify-center items-center'>
        <div className=' w-11/12 h-5/6'>
        <div className='text-xl font-bold'>Notifications</div>
        <div className=' border-t text-xs'>
            <h1 className=' mt-2'>{!notification&& 'You have no notification.'}</h1>
            {
              notification?.map(cuNotification=>(
                <div className='flex justify-between hover:bg-slate-50 border-b p-2 space-x-32'>
                  <div className=' w-full'>{cuNotification._notification}</div>
                  <div className=' w-5/12'>{cuNotification.created_at}</div>
                </div>
              ))
            }
        </div>
        </div>
    </div>
  )
}

export default Notification