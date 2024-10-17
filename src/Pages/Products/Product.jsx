import React, { useContext } from 'react'
import { useDishes } from '../../Context/Context';
import Breadcum from '../../components/Breadcum';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/ProductDisplay';
import DescriptionBox from '../../components/DescriptionBox';
import RelatedProducts from '../../components/RelatedProducts';
const Product=()=>{
    const data = useDishes();
    const {productId}=useParams();
    const dishes=data.all_product;
    // console.log("dishes arr",dishes);
    const product=dishes.find((e)=>e.id === Number(productId));
    return(
        <div>
            <Breadcum product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox/>
            <RelatedProducts product={product}/>
        </div>
    )
}
export default Product