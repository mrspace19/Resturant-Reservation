import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import toast from "react-hot-toast";
const AddProduct = () => {
  const [image,setImage]=useState(false);
  const [productDetails,setProductDetails]=useState({
    name:"",
    image:"",
    category:"Lunch",
    price:"",
    kind:"Veg"
   
  })
  const imageHandler=(e)=>{
      setImage(e.target.files[0]);
  }
  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
const Add_Product=async()=>{
  console.log(productDetails);
  let responseData;
  let product=productDetails;

  let formData=new FormData();
  formData.append('product',image);

  await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers:{
      Accept:'application/json'
    },
    body:formData,
  }).then((resp)=> resp.json()).then((data)=>{responseData=data}).catch((error) => { console.error('Error fetching data:', error); });
  
  if(responseData.success){
    product.image=responseData.image_url;
    console.log(product);
    await fetch('http://localhost:4000/addproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(product),
    }).then((resp)=>resp.json()).then((data)=>{
      if(data.success){toast.success("Product Added");setProductDetails({
        name:"",
        image:"",
        category:"",
        price:"",
        kind:""
      })}
      else{
      toast.error("Failed");
      }
    })
  }
}

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Dish</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Snacks'>Snacks</option>
          <option value='Breakfast'>Breakfast</option>
          <option value='Deserts'>Deserts</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Type</p>
        <select value={productDetails.kind} onChange={changeHandler} name="kind" className='add-product-selector'>
          <option value='Veg'>Veg</option>
          <option value='Non-Veg'>Non-Veg</option>
         
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct