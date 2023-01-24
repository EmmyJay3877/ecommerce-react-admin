import React from 'react'
import {MdOutlineDashboard, 
    MdPeople, 
    MdLogout, 
    MdOutlineShoppingCart,
    MdSettings} from 'react-icons/md'

import { BiAddToQueue } from 'react-icons/bi'

import {FaBoxOpen} from 'react-icons/fa'

import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const removeToken = ()=>{
        sessionStorage.removeItem('token')
      }

    const menus = [
        {name: "Dashboard", link: '/layout/', icon: <MdOutlineDashboard size={26}/>},
        {name: "Products", link: '/layout/items', icon: <FaBoxOpen size={26}/>},
        {name: "Customers", link: '/layout/customers', icon: <MdPeople size={26}/>},
        {name: "Orders", link: '/layout/orders', icon: <MdOutlineShoppingCart size={26}/>},
        {name: "Add product", link: '/layout/itemprofile', icon: <BiAddToQueue size={26}/>}
    ]

    const { pathname } = useLocation()

  return (
    <div className={`lg:w-40 w-20 text-black duration-500 h-full lg:mx-4 mt-6`}>
        <div className=' mt-14 flex flex-col gap-4 relative w-full'>
            <div className=' mb-5 w-full lg:mb-10'>
            {
                menus?.map((menu, i)=>(
                    <Link to={menu?.link} key={i} 
                className={`${pathname===menu.link && 'text-red-700 sm:font-medium md:font-medium'}  flex flex-col justify-center items-center font-medium text-xs p-0 py-1 gap-1 lg:flex lg:items-center lg:justify-start lg:flex-row lg:text-sm lg:p-1 lg:py-3 lg:gap-4 hover:bg-gray-300 lg:rounded-md mb-1`}>
                    <div>{menu?.icon}</div>
                    <h2 className={`whitespace-pre duration-500 lg:overflow-visible`}>{menu?.name}</h2>
                    </Link>
                ))
            }
            </div>
            <Link to={'/layout/profile'}>
                <div className= {`${pathname==='/layout/profile' && 'text-red-700 sm:font-medium md:font-medium'} flex flex-col justify-center items-center text-xs p-0 py-1 gap-2 lg:flex lg:items-center lg:justify-start lg:flex-row lg:text-sm lg:p-1 lg:py-3 font-medium lg:gap-4 hover:bg-gray-300 lg:rounded-md`}>
                        <div><MdSettings size={26}/></div>
                        <h2 className={`whitespace-pre duration-500 lg:overflow-visible`}>Settings</h2>
                </div>
            </Link>
            <Link to={'/'}>
                <div className= {`flex flex-col justify-center items-center text-xs p-0 py-1 gap-2 lg:flex lg:items-center lg:justify-start lg:flex-row lg:text-sm lg:p-1 lg:py-3 font-medium lg:gap-4 hover:bg-gray-300 lg:rounded-md`} onClick={removeToken}>
                        <div><MdLogout size={26}/></div>
                        <h2 className={`whitespace-pre duration-500 lg:overflow-visible`}>Logout</h2>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar