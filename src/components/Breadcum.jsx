import React from 'react'
import { Link } from 'react-router-dom'; 
import "./CSS/Breadcum.css"
import arrow_icon from '../../public/breadcrum_arrow.png';
const Breadcum=(props)=>{
    const {product} =props;
    return(
        <div className='breadcum'>
           <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '10px',
        transition: 'color 0.3s ease',
        cursor: 'pointer'
      }}
    >HOME </Link><img src={arrow_icon} alt="" /> Dishes <img src={arrow_icon} alt="" /> {product.name}
        </div>
    )
}
export default Breadcum;