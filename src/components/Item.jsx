import React from 'react'
import { Link } from 'react-router-dom';
import "./CSS/Item.css"
const Item=(props)=>{
    return(
    <div className='item'>
<Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link>
<p>{props.name}</p>
<div className='item-prices'>
    <div className='item-price-new'>{props.category}
    </div>
    <div className="item-price-new">
    ₹{props.price}
    </div>
</div>
</div>
    )
}
export default Item