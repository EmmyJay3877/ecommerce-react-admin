import React from 'react'
import { useEffect } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useStateContext } from '../StateContext';
import LoadingModal from './LoadingModal';

const Customers = () => {

    const { fetchCustomers, customers, response, setRes, setShowDeleteModal, setcustomerId, setShowLoading} = useStateContext()

    useEffect(()=>{
        fetchCustomers()
        setRes()
        setShowLoading(true)
    }, [])

  return (
    <div className=' main-div relative overflow-x-auto text-gray-500 flex flex-col justify-start items-start w-full text-sm h-full px-10 lg:px-0'>
        <LoadingModal/>
        <table className=' main-table shadow-xl w-full text-xs duration-500 bg-white p-6 h-auto font-[Poppins] md:m-0 md:ml-2 border-2 rounded-lg border-white lg:shadow-2xl lg:text-sm overflow-hidden'>
        <div className=' bg-white w-full p-4'>
                <h2 className=' text-lg text-black'>Customers</h2> 
                {
                    response && <span className='text-red-500 font-semibold text-xs mb-6'>{response}</span>
                }
            </div>
        <tr className=' tr-div bg-zinc-200 whitespace-nowrap'>
            <th className=' text-center w-20'> ID</th>
            <th className=' text-left py-4'>Username</th>
            <th className=' text-left'>Email</th>
            <th className=' text-left'>Phone</th>
            <th className=' text-left'>City</th>
            <th className=' text-left'>Region</th>
            <th></th>
        </tr>
        {
            customers?.map(customer=>(
                <tr className=' tr-div hover:underline' key={customer.id.toString()}>
                <td className=' py-4 text-center'>{customer?.id}</td>
                <td>{customer?.username}</td>
                <td>{customer?.email}</td>
                <td>{customer?.phone_number}</td>
                <td>{customer?.city}</td>
                <td>{customer?.region}</td>
                <td>
                <button className=' hover:scale-105 cursor-pointer hover:text-red-600' onClick={()=> {
                    setcustomerId(customer?.id)
                    setShowDeleteModal(true)
                }}>
                <MdDeleteForever size={26}/>
                </button>
                </td>
            </tr>
            ))
        }
        </table>

    </div>
      )
}

export default Customers