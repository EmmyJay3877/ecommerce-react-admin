import React from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../StateContext'
import LoadingModal from './LoadingModal'

const Orders = () => {

    const {response, setRes, getOrders, orders, setShowLoading} = useStateContext()

    useEffect(()=>{
        setShowLoading(true)
        getOrders()
        setRes()
    }, [])

  return (
    <div className=' main-div text-gray-500 flex justify-center items-start w-full text-sm overflow-x-auto lg:px-0'>
        <LoadingModal/>
        <table className='main-table shadow-xl w-full text-xs duration-500 bg-white p-6 h-auto font-[Poppins] md:m-0 md:ml-2 mr-2 ml-28 border-2 rounded-lg border-white lg:shadow-2xl lg:text-sm overflow-hidden'>
            <div className=' bg-white w-full p-4 sticky top-5'>
                <h2 className=' text-lg text-black'>Orders</h2> 
                {
                    response && <span className='text-red-500 font-semibold text-xs mb-6'>{response}</span>
                }
            </div>
        <tr className=' bg-zinc-200 whitespace-nowrap sticky top-9'>
            <th className=' text-center py-3'>Order ID</th>
            <th className=' text-left'>Customer ID</th>
            <th className=' text-left'>Item Name</th>
            <th className=' text-left'>Qty</th>
            <th className=' text-left'>Total Price</th>
            <th className=' text-left'>Status</th>
            <th className=' text-left'>Order Date</th>
            <th></th>
        </tr>

        {
            orders?.map((order, i)=>(
                <tr className=' tr-div hover:underline' key={i}>
                <td className=' text-center py-3'>{order?.order_id}</td>
                <td>{order?.customer_id}</td>
                <td>{order?.item_name}</td>
                <td>{order?.quantity}</td>
                <td>${order?.total_price}</td>
                <td>{order?.status}</td>
                <td>{order?.order_date.split("T")[0]}</td>
                </tr>
            ))
        }
        </table>
    </div>
  )
}

export default Orders