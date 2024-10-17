import React, { useEffect, useState } from 'react';
import './CSS/ListReservation.css';
import cross_icon from '../../public/cross_icon.png';
// const currentDate = new Date();
// const today = currentDate.toISOString().split('T')[0];
// const currentTime = new Date();
// const hours = String(currentTime.getHours()).padStart(2, '0');
// const minutes = String(currentTime.getMinutes()).padStart(2, '0');
// const time = `${hours}:${minutes}`;
const ListReservation = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allreservation')
      .then((res) => res.json())
      .then((data) => {
        data=data.filter(d=>d.email==localStorage.getItem('email'));
        console.log(data);
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removereservation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    
    await fetchInfo();
  };
  const isExpired = (productDate, productTime) => {
    // Combine the date and time strings into a single Date object
    const productDateTime = new Date(`${productDate}T${productTime}`);
    const currentDateTime = new Date(); // Current date and time
    return productDateTime < currentDateTime;
  };

   // Sort allproducts: non-expired at the top, expired at the bottom
   const sortedProducts = allproducts.sort((a, b) => {
    const aExpired = isExpired(a.date, a.time);
    const bExpired = isExpired(b.date, b.time);
    return aExpired - bExpired; // expired (true=1) come after non-expired (false=0)
  });

  return (
    <div className='list-product'>
      <h1>All Reservations</h1>
      <div className='listproduct-format-main'>
        <p>Name</p>
     <p>Date</p>
        <p>Time</p>
       <p></p>
        <p>Status</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {sortedProducts.map((product) => (
          <React.Fragment key={product._id}>
           <div
              className={`listproduct-format-main listproduct-format ${
                isExpired(product.date, product.time) ? 'non-highlight' : 'highlight-new'
              }`}
            >
              
              <div>{product.firstName+" "+product.lastName}</div>
    <div >{product.date}</div>
   <p>{product.time}</p>
              <p></p>
              {isExpired(product.date, product.time) ? (
                <p>Expires</p>
              ) :
              <img
                onClick={() => {
                  remove_product(product._id);
                }}
                className='listproduct-remove-icon'
                src={cross_icon}
                alt=''
              />
              }
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListReservation;
