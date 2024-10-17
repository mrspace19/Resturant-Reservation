import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p></p>
        <p>Dish</p>
        <p></p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className='listproduct-format-main listproduct-format'>
            {/* <p> {product.Type == "Veg" ? ( <div style={{ backgroundColor: 'green',height:'10px',width:'10px' }}></div>) : 
            ( <div style={{ backgroundColor: 'red',height:'10px',width:'10px'  }}></div>)}</p> */}
    <div style={{ height:'10px',width:'10px', backgroundColor: product.kind === "Veg" ? 'green' : 'red' }}></div>

              <img src={product.image} alt='' className='listproduct-product-icon' />
              <p>{product.name}</p>
              <p>₹{product.price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  remove_product(product.id);
                }}
                className='listproduct-remove-icon'
                src={cross_icon}
                alt=''
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
