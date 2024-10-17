import React, {useContext} from "react";
import star_icon from '../../public/star_icon.png'
import star_dull_icon from '../../public/star_dull_icon.png'
import "./CSS/ProductDisplay.css"
import { useDishes } from "../Context/Context";


 const ProductDisplay=(props)=>{
    const {product} =props;
    const data=useDishes();
    const addToCart=data.addToCart;
    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
            <div className="productdisplay-img-list">
    <img src={product.image} alt="" />
    <img src={product.image} alt="" />
    <img src={product.image} alt="" />
    <img src={product.image} alt="" />
</div>
<div className="productdisplay-img">
    <img className="productdisplay-main-img" src={product.image} alt=""/>

</div>
            </div>
            <div className="productdisplay-right">
<h1>{product.name}</h1>
<div className="productdisplay-right-stars">
    <img src={star_icon} alt=""/>
    <img src={star_icon} alt=""/>
    <img src={star_icon} alt=""/>
    <img src={star_icon} alt=""/>
    <img src={star_dull_icon} alt=""/>
    <p>(122)</p>
</div>

<div className="productdisplay-right-prices">
    
    <div className="productdisplay-right-price-new">₹{product.price}</div>
    
</div>
<div className="productdisplay-right-description">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Atque aut maxime id sunt magnam dolore saepe! Suscipit.

    
</div>
<div className="productdisplay-right-size">
    <h1>Select Size</h1>
    <div className="productdisplay-right-sizes">
        <div>Family (15-20 people)</div>
        <div>₹{product.price+150}</div>
        <div>Full Plate </div>
        <div>₹{product.price}</div>
        <div>Half Plate</div>
        <div>₹{product.price-70}</div>
    </div>
</div>
<button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
<p className="productdisplay-right-category"><span>Category :</span>{product.kind}</p>
 <p className="productdisplay-right-category"><span>Includes :</span> Spices, pepper  </p>
            </div>
        </div>
    )
 }
 export default ProductDisplay;