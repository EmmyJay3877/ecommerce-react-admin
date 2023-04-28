import React from "react";
import { useRef } from "react";
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({children})=>{

    const errorMsg = 'An error has occured'

    const timeOut = ()=>{
        setTimeout(() => {
            setRes('')
        }, 6000);
    }

    const backToLogin = ()=>{
        setTimeout(() => {
            window.location.href = `${process.env.REACT_APP_HOST}`;
        }, 9000);
    }

    const [response, setRes] = useState()
    const [itemRes, setItemRes] = useState({})
    const [ formData, setFormData ] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [customers, setCustomers] = useState([])
    const [show, setShow] = useState(false);
    const [interValId, setIntervalId] = useState(null)
    const [orders, setOrders] = useState([])
    const [itemCards, setItemCards] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [customerId, setcustomerId] = useState()
    const [itemId, setItemId] = useState()
    const [unverifiedUsers, setUnverifiedUsers] = useState(0)
    const [deleteunverifiedUsers, setDeleteUnverifiedUsers] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [notification, setNotification] = useState([])
    const [notiNumber, setNotiNumber] = useState(0)

    const handleClose = ()=> {
      setShow(false);
      sessionStorage.removeItem('token')
      window.location.href = `${process.env.REACT_APP_HOST}`
    }

    const checkInterVal = ()=>{
        const id = setInterval(verifyToken, 600000);
        setIntervalId(id)
        return () => clearInterval(interValId);
    }
  
    const login = async (event) => {
        event.preventDefault()
        const email = event.target.form.elements.email.value;
        const password = event.target.form.elements.password.value;
        try {
            if (email === '' && password === '') return null;
            else{
                const info = {
                    grant_type: 'password',
                    username: email,
                    password: password,
                  };
        
                const res = await fetch(`${process.env.REACT_APP_SERVER}/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(info).toString()
                })
                const data = await res.json();
                const statusCode = await res.status;
                if (statusCode === 200 && data.access_token !== undefined){
                        setShowLoading(false)
                        const token = data.access_token
                        sessionStorage.setItem('token', token)
                        window.location.href = `${process.env.REACT_APP_HOST}/layout/`;
                    }
                else if('detail' in data){
                            setShowLoading(false)
                            setRes(data.detail)
                            timeOut()
                    }
            } 
        } catch (error) {
            setShowLoading(false)
            setRes('An error occured')
        }
    }

    const verifyToken = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/admin/check-token/`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode!==200) {
                setShow(true)
            }
        } catch (error) {
            alert(error)
        }
    }

    const updatePassword = (event)=>{
        event.preventDefault()
        const password = event.target.form.elements.newPassword.value;
        let token_data = sessionStorage.getItem('token');
        const putNewPassword = async ()=>{
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/admin/update_password/`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'password': password
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status;
                if (statusCode === 200 && 'data'in data) {
                    setShowLoading(false)
                    setRes(data.data)
                    timeOut()
                } else if(statusCode===401){
                    setShowLoading(false)
                    setShow(true)
                }
            } catch (error) {
                setRes('An error occured')
            }
        }
        putNewPassword()
    }

    const checkEmail = async (event)=>{
        event.preventDefault()
        const email = event.target.form.elements.email.value;
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/admin/verify/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email
                })
            })
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode === 200 && 'data' in data) {
                 const password = await data.data
                 const resetPasswordTemplate = `
                 <!DOCTYPE html>
                 <html>
                   <head>
                     <title>Email Verification</title>
                   </head>
                   <body>
                     <table width="100%" cellpadding="0" cellspacing="0" border="0">
                       <tr>
                         <td align="center">
                           <table width="600" cellpadding="0" cellspacing="0" border="0">
                             <!-- Header -->
                             <tr>
                               <td bgcolor="#333333" style="padding: 40px 0;">
                                 <h1 style="color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">Password Reset</h1>
                               </td>
                             </tr>
                             <!-- Content -->
                             <tr>
                               <td bgcolor="#ffffff" style="padding: 40px;">
                               <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Hey Admin</p>
                                 <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">This is your temporary password. Please do make sure to update your passowrd as soon as you login.</p>
                                 <h1>${password}</h1>
                                 <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Please do not share this password with anyone.</p>
                               </td>
                             </tr>
                             <!-- Footer -->
                             <tr>
                               <td bgcolor="#333333" style="padding: 40px;">
                                 <p style="color: #ffffff; font-size: 16px; font-family: Arial, sans-serif;">Copyright 2021. All rights reserved.</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                   </body>
                 </html>
               `;
                    await window.Email.send({
                     SecureToken : process.env.REACT_APP_SECURE_TOKEN,
                     To : email,
                     From : 'mackenziemominskq37@gmail.com',
                     Subject : "Password Reset",
                     Body : resetPasswordTemplate
                 }).then(
                    message => {
                        console.log(message)

                        setShowLoading(false)
    
                        window.location.href = `${process.env.REACT_APP_HOST}/emailmsg/`;
                    }
                    );
            }
            else if ('detail' in data){ 
                setShowLoading(false)
                setRes(data.detail)
            }
        } catch (error) {
            setShowLoading(false)
            setRes(errorMsg)
        }
    }

    const fetchCustomers = async () => {
        let token_data = sessionStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/customers/`, {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            })
            const data = await res.json()
            const statusCode = await res.status;
            if (statusCode === 200 && data){ 
                setCustomers(data)
                setShowLoading(false)
            }
            else if (statusCode===401) setShow(true)
        } catch (error) {
            setShowLoading(false)
            setRes(errorMsg)
        }
    }

    const allPendingOrders = () => {
        const pendingOrders = orders?.filter(order=> order.status === 'PENDING')
        const successfullOrders = orders?.filter(order=> order.status === 'SUCCESS')
        return [pendingOrders.length, successfullOrders.length]
    }

    const allCustomers = ()=>{
        return customers?.length
    }

    const allItems = ()=>{
        return itemCards?.length
    }

    const getNotification = async ()=>{
        let token_data = sessionStorage.getItem('token')
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/admin/notification`, {
                headers: {'Authorization': `Bearer ${token_data}`}
            })
            const data = await res.json()
            const statusCode = res.status
            if (data && statusCode===200) {
                setShowLoading(false)
                setNotification(data.reverse())
            }
            if (statusCode===404){
                setShowLoading(false)
                setNotification()
            }
        } catch (error) {
            alert(errorMsg)
        }
    }

    const resetNotificationCount =async ()=>{
        let token_data = sessionStorage.getItem('token')
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/admin/notification-reset`, {
                headers: {'Authorization': `Bearer ${token_data}`}
            })
            const statusCode = res.status
            if (statusCode===200) {
                setShowLoading(false)
            }
            if (statusCode===404){
                setShowLoading(false)
            }
        } catch (error) {
            alert(errorMsg)
        }
    }

    const loadNotification =  async ()=>{
        let token_data = sessionStorage.getItem('token')
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/admin`, {
                headers: {'Authorization': `Bearer ${token_data}`}
            })
            const data = await res.json()
            const statusCode = res.status
            if (data && statusCode===200) {
                setShowLoading(false)
                setNotiNumber(data._new_notification_count)
            }
            if (statusCode===404){
                setShowLoading(false)
            }
        } catch (error) {
            alert(errorMsg)
        }
    }

    const deleteCustomer = async (event, id)=>{
        event.preventDefault()
        let token_data = sessionStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/customers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            })
            const data = await res.json()
            const statusCode = await res.status;
            if (statusCode === 200 && 'status' in data) {
                setCustomers(prevCustomers=>prevCustomers?.filter(prevCustomers=>prevCustomers?.id!==id))
                setShowLoading(false)
            }
            else if(statusCode===401) setShow(true)
        } catch (error) {
            setShowLoading(false)
            alert(errorMsg)
        }
    }

    const unverifiedCustomers = async () => {
        let token_data = sessionStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/customers/unverified`, {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            })
            const data = await res.json();
            const statusCode = await res.status;
            if (statusCode===200) {
                setUnverifiedUsers(data)
            } else if (statusCode===404) setUnverifiedUsers(0)
            
            else if(statusCode===401) setShow(true)
        } catch (error) {
            alert(errorMsg)
        }
    }

    const deleteUnverifiedUsers = async (event)=>{
        event.preventDefault()
        let token_data = sessionStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/customers/unverified/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            })
            const statusCode = await res.status
            if (statusCode===200) {
                setShowLoading(false)
                await unverifiedCustomers()
            } else if(statusCode===401) setShow(true)
        } catch (error) {
            setShowLoading(false)
            alert(errorMsg)
        }
        setShowLoading(false)
    }
    
    const getOrders = async ()=>{
        let token_data = sessionStorage.getItem('token');
        try{
            const res = await fetch(`${process.env.REACT_APP_SERVER}/admin/orders/`, {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            })
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode===401) setShow(true)
            if (statusCode===200) {
                setShowLoading(false)
                setOrders(data)
            }else if('detail' in data) {
                setShowLoading(false)
                setRes(data.detail)
                timeOut()
            }
        } catch (error) {
            alert('An error has occured')
        }
    }

    const getItems = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/items/`)
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode===200){ 
                setItemCards(data)
                setShowLoading(false)
            }
            else if (statusCode===401){ 
                setShowLoading(false)
                setShow(true)
            }
        } catch (error) {
            alert(errorMsg)
            setShowLoading(false)
        }
      }

    const deleteItemCard = (event, id)=>{
        event.preventDefault()
        let token_data = sessionStorage.getItem('token');
        const deleteItem = async()=>{
          try {        
            const res = await fetch(`${process.env.REACT_APP_SERVER}/items/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token_data}`
              }
            })
            const data = await res.json()
            const statusCode = await res.status;
            if (statusCode === 200 && 'data' in data) {
                getItems()
            }
            else if (statusCode===401) {
                setShow(true)
            }
          }catch (error){
            setShowLoading(false)
            alert('An error has occured')
          }
        }
        deleteItem()
      }
  
    const addItem = (event)=>{
        event.preventDefault()
        const name = event.target.form.elements.name.value;
        const description = event.target.form.elements.description.value;
        const price = event.target.form.elements.price.value;
        let token_data = sessionStorage.getItem('token');
        const postItem = async ()=>{
            try {   
                const res = await fetch(`${process.env.REACT_APP_SERVER}/items/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        'name': name,
                        'description': description,
                        'price': price
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status;
                if (statusCode === 201 && 'item_id' in data){
                    setShowLoading(false)
                    setRes('')
                    setItemRes(data)
                    }
                else if(statusCode===401){ 
                    setShowLoading(false)
                    setShow(true)
                }
            } catch (error) {
                setShowLoading(false)
                alert(errorMsg)
            }
        }
        postItem()
    }

    const addImage = (event)=>{
        event.preventDefault()
        let token_data = sessionStorage.getItem('token');
        const imageData = new FormData()
        imageData.append("image", formData.image, formData.image.name)
        const postImage = async ()=>{
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/items/update_itemImage/${itemRes.item_id}`, {
                    method: 'PUT',
                    body: imageData,
                    headers: {
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status;
                if (statusCode === 201) {
                    setShowLoading(false)
                    setItemRes({...itemRes, status: 'Image uploaded successfully. The item is published.'})
                    setTimeout(() => {
                        setItemRes({...itemRes, status: ''})
                      }, 6000);
                } else if('detail' in data){
                    setShowLoading(false)
                    setTimeout(() => {
                        setItemRes({...itemRes, status: data.detail})
                    }, 3000);
                } else if(statusCode===401) setShow(true)
            } catch (error) {
                setShowLoading(false)
                alert(errorMsg)
            }
        }
        if ('item_id' in itemRes) postImage()
        else {
            alert(errorMsg)
        }
    }

    const updateItem = (event, id)=>{
        event.preventDefault()
        let token_data = sessionStorage.getItem('token');
        const putItem = async ()=>{
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/items/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'name': formData.name,
                        'description': formData.description,
                        'price': formData.price
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status
                if (statusCode === 200 && data){
                    setShowLoading(false)
                    setRes('')
                     setItemRes(data)
                    }
                else if(statusCode===401) setShow(true)
            } catch (error) {
                setShowLoading(false)
                alert(errorMsg)
            }
        }
        putItem()
    }

    const updateImage = (event)=>{
        event.preventDefault()
        let token_data = sessionStorage.getItem('token');
        const imageData = new FormData()
        imageData.append("image", formData.image, formData.image.name)
        const putImage = async ()=>{
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/items/update_itemImage/${itemRes.item_id}`, {
                    method: 'PUT',
                    body: imageData,
                    headers: {
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status
                if (statusCode === 201) {
                    setShowLoading(false)
                    setItemRes({...itemRes, status: 'Image uploaded successfully. The item is updated.'})
                    setTimeout(() => {
                        setItemRes({...itemRes, status: ''})
                      }, 6000);
                } else if ('detail' in data){
                    setShowLoading(false)
                    setTimeout(() => {
                        setItemRes({...itemRes, status: data.detail})
                    }, 3000);
                } else if(statusCode===401) setShow(true)
            } catch (error) {
                setShowLoading(false)
                alert(errorMsg)
            }
        }
        if ('item_id' in itemRes) putImage()
        else {
            alert(errorMsg)
        }
    }

    return <StateContext.Provider
            value={{
                login,
                response,
                updatePassword,
                setRes,
                addItem,
                itemRes,
                addImage,
                setItemRes,
                formData,
                setFormData,
                fetchCustomers,
                customers,
                setCustomers,
                deleteCustomer,
                updateImage,
                updateItem,
                checkEmail,
                timeOut,
                backToLogin,
                verifyToken,
                handleClose,
                show,
                interValId, 
                setIntervalId,
                checkInterVal,
                allCustomers,
                getOrders,
                orders,
                allPendingOrders,
                itemCards,
                getItems,
                deleteItemCard,
                allItems,
                showDeleteModal, 
                setShowDeleteModal,
                customerId, 
                setcustomerId,
                itemId, 
                setItemId,
                unverifiedCustomers,
                unverifiedUsers,
                deleteUnverifiedUsers,
                deleteunverifiedUsers, 
                setDeleteUnverifiedUsers,
                showLoading, 
                setShowLoading,
                getNotification,
                notification,
                notiNumber,
                setNotiNumber,
                loadNotification,
                resetNotificationCount
            }}
    >
        {children}
    </StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);
