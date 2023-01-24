import React from 'react'
import { useEffect } from 'react'
import { MdPeople } from 'react-icons/md'
import { Link } from 'react-router-dom'
import '../index.css'
import { useStateContext } from '../StateContext'
import RecentOrders from './RecentOrders'
import { GoUnverified, GoReport } from 'react-icons/go'
import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa'
import { BsFillCartCheckFill } from 'react-icons/bs'
import LoadingModal from './LoadingModal'

const Dashboard = () => {

  const {allCustomers, fetchCustomers, allPendingOrders, getOrders, allItems, getItems, unverifiedCustomers, unverifiedUsers, setDeleteUnverifiedUsers, setShowDeleteModal, setShowLoading} = useStateContext()

  let totalCustomers = allCustomers()
  let orderStatus = allPendingOrders()
  let totalItems = allItems()

  const cards = [
    {name: "Total Customers", value: `${totalCustomers}`, icon: <MdPeople size={24}/>, color: 'bg-purple-500'},
    {name: "Total Pending Orders", value: `${orderStatus[0]}`, icon: <FaShoppingCart size={24}/>, color: 'bg-yellow-500'},
    {name: "Total Successful Orders", value: `${orderStatus[1]}`, icon: <BsFillCartCheckFill size={24}/>, color: 'bg-green-500'},
    {name: "Total Item Available", value: `${totalItems}`, icon: <FaBoxOpen size={24}/>, color: 'bg-blue-500'},
]

  useEffect(()=>{
    fetchCustomers()
    getOrders()
    getItems()
    unverifiedCustomers()
    setShowLoading(true)
  }, [])

  return (
    <div className='flex flex-col w-full h-full'>
      <LoadingModal/>
      Dashboard
      <div className='flex flex-col p-4 lg:p-8 h-full '>
        <div className='card-row flex md:flex-row md:justify-between lg:flex-row lg:justify-around mb-4'>
          {/* cards */}
          {
            cards?.map(card=> (
              <div className=' block bg-white p-6 rounded-lg shadow-xl hover:shadow-sm lg:w-48 md:w-auto md:mr-7 md:h-48 lg:h-40'>
              <div className={`p-3 ${card.color} mb-3 rounded-full w-fit text-white`}>{card.icon}</div>
              <div className='flex flex-col'>
                <p className=' text-xs font-semibold mb-2'>{card.name}</p>
                <p className=' font-semibold'>{card.value}</p>
              </div>
            </div>
            ))
          }
        </div>
        <div className=' flex flex-col lg:flex-row lg:items-start lg:space-x-4'>
          {/* recent order tables */}
          <div className=' mt-5 w-full lg:w-6/12'>
            <h2>Recent Orders</h2>
            <RecentOrders/>
            <Link to={`/layout/orders`}>
            <button className=' text-blue-600 hover:text-blue-400 w-full text-center'>show all</button>
            </Link>
          </div>
          <div className=' mt-11 lg:space-y-4 flex gap-1 lg:flex-col'>
          <div className=' block bg-white p-2 rounded-lg w-full shadow-sm hover:shadow-none lg:w-auto md:w-auto md:mr-7 md:h-fit lg:h-fit'>
              <div className=' p-3 mb-1 flex space-x-3 items-center'>
                <GoUnverified size={26}/>
                <p className=' text-xs font-semibold h-full text-center'>Unverified Customers:</p>
                <p className=' text-xs font-semibold'>{unverifiedUsers}</p>
              </div>
                <button type='submit' onClick={(e)=> {
                  setDeleteUnverifiedUsers(true)
                  setShowDeleteModal(true)
                  }} className=' text-sm font-semibold w-full text-center bg-red-500 hover:bg-red-400 text-white py-2'>Delete</button>
            </div>
          <div className=' block bg-white p-2 rounded-lg w-full shadow-sm hover:shadow-none lg:w-auto md:w-auto md:mr-7 md:h-fit lg:h-fit'>
              <div className=' p-3 mb-1 flex space-x-3 items-center'>
                <GoReport size={26}/>
                <p className=' text-xs font-semibold h-full text-center'>Complaints:</p>
                <p className=' text-xs font-semibold'>12</p>
              </div>
                <button className=' text-sm font-semibold w-full text-center bg-green-500 hover:bg-green-400 text-white py-2'>Check</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard