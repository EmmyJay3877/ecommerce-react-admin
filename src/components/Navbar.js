import React, { useEffect } from 'react'
import '../index'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useStateContext } from '../StateContext';

const socket = io(`${process.env.REACT_APP_SOCKET_SERVER}`, {path: '/ws/socket.io', autoConnect: false});

const Navbar = () => {

  const { notiNumber, setNotiNumber, loadNotification } = useStateContext()
  

  useEffect(()=>{
    loadNotification()
  }, [])

  useEffect(()=>{

    socket.connect()

    socket.on('receive_notification', ()=>{
      setNotiNumber(prevCount => prevCount + 1);
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <div className=' nav-bar flex items-center justify-start p-0 m-0 text-gray-400'>
      <div className='text-xl lg:text-3xl font-bold m-4 mr-24 md:mr-96 lg:mr-96'> Dynamic Headphones </div>
      <Link to={'/layout/notification'}>
      <div className='noti-icon flex flex-row w-fit' onClick={()=>setNotiNumber(0)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell cursor-pointer text-black" viewBox="0 0 16 16"> <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>
      <span className='relative origin-top-right -left-3 -top-1 font-bold bg-red-600 text-white text-xs w-4 h-4 rounded-full text-center cursor-pointer'>{notiNumber===0 || notiNumber===undefined? '0': notiNumber}</span>
      </div>
      </Link>
    </div>
  )
}

export default Navbar