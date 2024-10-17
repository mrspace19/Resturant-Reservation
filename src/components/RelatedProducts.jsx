import React from "react";
import Item from "./Item";
import "./CSS/RelatedProducts.css";
import { useDishes } from "../Context/Context";
const RelatedProducts=(props)=>
    
    {
        const data=useDishes();
        const all_product=data.all_product;
        const {product} =props;
        return(
            <div className="relatedproducts">
<h1>{product.category} Products</h1>
<hr/>
<div className="relatedproducts-item">
{all_product.map((item,i)=>{
    if(product.category===item.category)
     return <Item key={i} id={item.id} name={item.name} image={item.image} category={item.category} price={item.price}/>  
})}
</div>
            </div>
        )
    }
    export default RelatedProducts;