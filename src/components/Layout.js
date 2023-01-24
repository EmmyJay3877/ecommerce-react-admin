import React, { useEffect } from 'react'
import '../index.css'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SessionExpiredModal from './SessionExpiredModal'
import { useStateContext } from '../StateContext'
import DeleteModal from './DeleteModal'

const Layout = () => {

    const {checkInterVal, interValId} = useStateContext()

    useEffect(()=>{
        checkInterVal()
        return ()=> clearInterval(interValId)
    }, [])

  return (
    <div className=' flex flex-row h-full w-full'>
      <SessionExpiredModal/>
      <DeleteModal/>
      <div className=' sidebar shadow-lg'><Sidebar/></div>
      <div className=' p-4 w-full'>
      <div className='nav-sticky fixed left-20 top-0 z-10 w-full lg:fixed lg:top-0 lg:z-10 lg:w-full lg:left-52'><Navbar/></div>
      <div className=' flex justify-start absolute top-16 left-24 w-3/4 lg:absolute lg:top-20 lg:left-52 lg:w-10/12'>{<Outlet/>}</div>
      </div>
    </div>
  )
}

export default Layout