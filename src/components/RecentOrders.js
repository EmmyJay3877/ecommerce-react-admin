import React from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../StateContext'

const RecentOrders = () => {

    const {response, setRes, getOrders, orders} = useStateContext()

    const recentOrders = orders?.slice(-4).reverse()

    useEffect(()=>{
        getOrders()
        setRes()
    }, [])

  return (
    <div className=' main-div text-gray-500 flex justify-center items-start w-full text-sm overflow-x-auto lg:px-0'>
        <table className='main-table shadow-xl w-full text-xs duration-500 bg-white p-6 h-auto font-[Poppins] md:m-0 md:ml-2 mr-2 border-2 rounded-lg border-white lg:shadow-2xl lg:text-sm overflow-hidden'>
                {
                    response && <span className='text-red-500 font-semibold text-xs mb-6'>{response}</span>
                }
        <tr className=' bg-zinc-200 '>
            <th className=' text-left py-4 pl-4'>Item Name</th>
            <th className=' text-left'>Customer ID</th>
            <th className=' text-left'>Qty</th>
            <th className=' text-left'>Status</th>
        </tr>

        {
            recentOrders?.map((order)=>(
                <tr className=' tr-div hover:underline' key={order?.order_id}>
                <td className=' py-3 pl-4'>{order?.item_name}</td>
                <td>{order?.customer_id}</td>
                <td>{order?.quantity}</td>
                <td>{order?.status}</td>
                </tr>
            ))
        }
        </table>
    </div>
  )
}

export default RecentOrders