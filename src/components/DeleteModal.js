import React from 'react'
import { useStateContext } from '../StateContext'
import '../index.css'
import { useEffect } from 'react'

const DeleteModal = () => {

    const {showDeleteModal, setShowDeleteModal, deleteItemCard, deleteCustomer, customerId, itemId, setItemId, setcustomerId, deleteunverifiedUsers, setDeleteUnverifiedUsers, deleteUnverifiedUsers, setShowLoading} = useStateContext()

    useEffect(()=>{
      setShowLoading(false)
    }, [])
    
  return (
    <div>
    {(showDeleteModal===true && itemId!==undefined) && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h2>Are you sure you want to delete this item?</h2>
            <div className="delete-modal-buttons">
              <button type='submit' onClick={(e) => {
                setShowLoading(true)
                deleteItemCard(e, itemId)
                setShowDeleteModal(false)
                setItemId()
                }}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    {(showDeleteModal===true && customerId!==undefined) && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h2>Are you sure you want to delete this Customer?</h2>
            <div className="delete-modal-buttons">
              <button type='submit' onClick={(e) => {
                setShowLoading(true)
                deleteCustomer(e, customerId)
                setShowDeleteModal(false)
                setcustomerId()
                }}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    {(showDeleteModal===true && deleteunverifiedUsers===true) && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h2>Are you sure you want to delete all unverified users?</h2>
            <div className="delete-modal-buttons">
              <button type='submit' onClick={(e) => {
                setShowLoading(true)
                deleteUnverifiedUsers(e)
                setShowDeleteModal(false)
                setDeleteUnverifiedUsers(false)
                }}>Yes</button>
              <button onClick={() => {
                setShowDeleteModal(false)
                setDeleteUnverifiedUsers(false)
                }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteModal