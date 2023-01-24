import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {FaEdit} from 'react-icons/fa'
import '../index.css'
import { useEffect } from 'react'
import { useStateContext } from '../StateContext'
import LoadingModal from './LoadingModal'

const Items = () => {

  const { itemCards, getItems, setShowDeleteModal, setItemId, setShowLoading} = useStateContext()
  
    useEffect(()=>{
      setShowLoading(true)
      getItems()
    }, [])
  
  return (
    <div className='m-0 w-full duration-500'>
      <LoadingModal/>
      <div><h2>Products</h2></div>
      <div className='products-container'>
        {
          itemCards?.map(itemcard=>(
              <div className="product-card" key={itemcard.id.toString()}>
                <img 
                  src={itemcard.image}
                  width={250}
                  height={250}
                  className="product-image"
                />
                <Link to={`/layout/edititem/?id=${itemcard.id}`}>
                <div className=' edit absolute right-0 top-0 m-3 text-3xl hover:scale-125 cursor-pointer'><FaEdit/></div>
                </Link>
                <div className=' edit absolute right-0 m-4 text-3xl hover:scale-125 cursor-pointer' 
                onClick={()=>{
                  setItemId(itemcard.id)
                  setShowDeleteModal(true)
                  }}><MdDeleteForever /></div>
                <p className="product-name">{itemcard.name}</p>
                <p className="product-price">${itemcard.price}</p>
              </div>
          ))
        }
      </div>
    </div> 
  )
}

export default Items