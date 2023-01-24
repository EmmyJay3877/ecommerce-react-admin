import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useStateContext } from '../StateContext'
import LoadingModal from './LoadingModal'

const EditItem = () => {

    const {itemRes, updateItem, updateImage, setItemRes, formData, setFormData, setRes, response, setShowLoading} = useStateContext()

    useEffect(()=>{
      setItemRes({})
      setFormData({
        name: '',
        description: '',
        price: '',
        image: ''
    })
    setRes()
    setShowLoading(true)
    }, [])

    const [itemDetail, setItemDetail] = useState({})

    const [searchparams] = useSearchParams()
    let id = searchparams.get('id')

    useEffect(()=>{
        const getItemDetail = async () => {
          const res = await fetch(`${process.env.REACT_APP_SERVER}/items/${id}`)
          const data = await res.json()
          setShowLoading(false)
          setItemDetail(data);
        }
    
        getItemDetail()
    
        .catch(console.error)
      }, [id])

      const {name, description, price} = itemDetail

    const [errors, setErrors] = useState({});

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }

    const handleImgChange = (event)=>{
        setFormData({
            ...formData,
            image: event.target.files['0']})
    }

    const uploadImage = (event)=>{
        event.preventDefault()

        const newErrors = {}
        if (formData.image === ''){
            newErrors.image = 'Please select an image'
        }
        setErrors(newErrors);        
        if (Object.keys(newErrors).length === 0) {
            setShowLoading(true)
            updateImage(event)
            let inputs = document.querySelectorAll("input")
            inputs.forEach((input) => (input.value = ""))
        } 
    }

    const submitItemDetails = async(event, id)=>{
        event.preventDefault()

        const newErrors = {}
        if (formData.name.length < 3){
            newErrors.name = 'Name should be at least more than 3 characters'
        }
        if (formData.description.length < 6){
            newErrors.description = 'Description should be at least more than 6 characters'
        }
        if (formData.price === ''){
            newErrors.price = 'Please input a price for the item'
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setShowLoading(true)
            // Submit the form data here
            updateItem(event, id)
            let inputs = document.querySelectorAll("input")
            inputs.forEach((input) => (input.value = ""))
        }   
    }

  return (
    <form className=' w-fit min-h-fit overflow-hidden'>
      <LoadingModal/>
    <div className="min-h-fit p-2 flex items-start justify-center max-w-fit">
      <div className=" bg-transparent rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Item Details</p>
            <p>Edit existing item</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label>Item Name</label>
                <input 
                type="text" 
                name="name" 
                defaultValue={name} 
                onChange={handleChange}
                id="name" 
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                placeholder='Item name'  />
                {errors.name && (
                <p className="text-red-500 text-xs font-semibold">{errors.name}</p>
                )}
              </div>

              <div className="md:col-span-5">
                <label>Description</label>
                <input 
                type="text" 
                name="description" 
                id="description" 
                defaultValue={description} 
                onChange={handleChange}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                placeholder="item description" />
                {errors.description && (
                <p className="text-red-500 text-xs font-semibold">{errors.description}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label>Price</label>
                <input 
                type="number" 
                name="price" 
                id="price" 
                defaultValue={price} 
                min="0"
                onChange={handleChange}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   
                placeholder="$0.00" />
                {errors.price && (
                <p className="text-red-500 text-xs font-semibold">{errors.price}</p>
                )}
              </div>
            </div>
          <div className='flex justify-between mt-10'>
                <Link to={"/layout/items"}>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Back</button>
                </div>
              </div>
                </Link>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button 
                  type='submit' 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={e=>{
                    submitItemDetails(e, itemDetail.id)
                  }}
                  >Update</button>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 mt-8">
            {
                    response && (
                      <p className="text-red-500 text-xs font-semibold">{response}</p>
                  )
              }
                {
                    itemRes.status && (
                        <p className="text-red-500 text-xs font-semibold">{itemRes.status}</p>
                    )
                }
                <label htmlFor="file" className='font-medium text-lg'>Upload item Image after creating the Item</label>
                <p>Item will not be published if there's no image</p>
                <input 
                type="file" 
                name="file" 
                id="image" 
                onChange={handleImgChange}
                className="h-10 mt-4  w-full "   
                 />
                {errors.image && (
                <p className="text-red-500 text-xs font-semibold">{errors.image}</p>
                )}
              </div>
              <div className="md:col-span-5 bg-slate-600 text-center">
                <div className="inline-flex items-end w-full">
                  <button 
                  type='submit' 
                  className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                  onClick={e=>uploadImage(e, itemDetail.id)}
                  >Update Image</button>
                </div>
              </div>
          </div>
        </div>
      </div>
</div>
</form>
  )
}

export default EditItem