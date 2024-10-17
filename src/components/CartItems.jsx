// import React, { useContext } from "react";
// import './CSS/CartItems.css';
// import { useDishes } from "../Context/Context";
// import remove_icon from '../../public/cart_cross_icon.png';
// import { Link } from 'react-router-dom';

// const CartItems = () => {
//   const { getTotalCartAmount, all_product, cartItems, removeFromCart,updateCartItemQuantity } = useDishes();
//   if (!all_product || all_product.length === 0) {
//     return <p>Loading...</p>; // or any other fallback UI
//   }
//   const cartHasItems = Object.values(cartItems).some(quantity => quantity > 0);
//     // Function to handle increasing item quantity
//     const handleIncrement = (id) => {
//       updateCartItemQuantity(id, cartItems[id] + 1);
//     };
  
//     // Function to handle decreasing item quantity
//     const handleDecrement = (id) => {
//       if (cartItems[id] > 1) {
//         updateCartItemQuantity(id, cartItems[id] - 1);
//       }
//     };
//   return (
//   <>
//   {cartHasItems?
//     <div className="cartitems">
      
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (cartItems[e.id] > 0) {
//           return (
//             <div key={e.id}> {/* Ensure key is added */}
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>
//                 <p>₹{e.price}</p>
//                 <div className="cartitems-quantity">
//                 <div onClick={() => handleDecrement(e.id)}>-</div>
//                     <span>{cartItems[e.id]}</span>
//                     <div onClick={() => handleIncrement(e.id)}>+</div>
//                     </div>
//                 <p>₹{e.price * cartItems[e.id]}</p>
//                 <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>Cart Totals</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>Free</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <h3>Total</h3>
//               <h3>₹{getTotalCartAmount()}</h3>
//             </div>
//           </div>{
//              cartHasItems?(<Link to={!localStorage.getItem('auth-token')?"/login":"/checkout"}><button>CHECKOUT</button></Link>): <div className="empty-cart-message">Cart is Empty</div>
//           }
         
//         </div>
//         <div className="cartitems-promocode">
//           <p>If you have any promo code, enter it here</p>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="Promo code" />
//             <button>Apply</button>
//           </div>
//         </div>
      
//       </div>

//     </div>
// :<div  style={{
//   textAlign: 'center',
//   color: '#ff6347',      
//   fontSize: '1.5rem',
//   padding: '20px',
//   border: '2px dashed #ff6347',
//   borderRadius: '10px',
//   backgroundColor: '#fff4f4',
//   marginTop: '20px',
// }}>Cart is Empty</div>}   
// </> 
//   );
// };

// export default CartItems;

import React, { useContext, useState } from "react";
import './CSS/CartItems.css';
import { useDishes } from "../Context/Context";
import remove_icon from '../../public/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, updateCartItemQuantity } = useDishes();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  // Available promo codes
  const promoCodes = {
    "SAVE10": 0.10,  // 10% discount
    "SAVE20": 0.20,  // 20% discount
    "FREESHIP": 0.05 // 5% discount for free shipping equivalent
  };

  // Handle applying the promo code
  const applyPromoCode = () => {
    if (promoCodes[promoCode]) {
      setDiscount(promoCodes[promoCode]);
      setPromoError("");  // Clear any error
    } else {
      setDiscount(0);
      setPromoError("Invalid promo code");
    }
  };

  if (!all_product || all_product.length === 0) {
    return <p>Loading...</p>; // or any other fallback UI
  }

  const cartHasItems = Object.values(cartItems).some(quantity => quantity > 0);

  // Function to handle increasing item quantity
  const handleIncrement = (id) => {
    updateCartItemQuantity(id, cartItems[id] + 1);
  };

  // Function to handle decreasing item quantity
  const handleDecrement = (id) => {
    if (cartItems[id] > 1) {
      updateCartItemQuantity(id, cartItems[id] - 1);
    }
  };

  // Calculate total after discount
  const totalBeforeDiscount = getTotalCartAmount();
  const discountAmount = totalBeforeDiscount * discount;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  return (
    <>
      {cartHasItems ? (
        <div className="cartitems">
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className="carticon-product-icon" />
                    <p>{e.name}</p>
                    <p>₹{e.price}</p>
                    <div className="cartitems-quantity">
                      <div onClick={() => handleDecrement(e.id)}>-</div>
                      <span>{cartItems[e.id]}</span>
                      <div onClick={() => handleIncrement(e.id)}>+</div>
                    </div>
                    <p>₹{e.price * cartItems[e.id]}</p>
                    <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Subtotal</p>
                  <p>₹{totalBeforeDiscount.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                  <>
                    <hr />
                    <div className="cartitems-total-item">
                      <p>Discount</p>
                      <p>-₹{discountAmount.toFixed(2)}</p>
                    </div>
                  </>
                )}
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>₹{totalAfterDiscount.toFixed(2)}</h3>
                </div>
              </div>
              {cartHasItems ? (
                <Link to={!localStorage.getItem('auth-token') ? "/login" : "/checkout"}>
                  <button>CHECKOUT</button>
                </Link>
              ) : (
                <div className="empty-cart-message">Cart is Empty</div>
              )}
            </div>
            <div className="cartitems-promocode">
              <p>If you have any promo code, enter it here</p>
              <div className="cartitems-promobox">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Promo code"
                />
                <button onClick={applyPromoCode}>Apply</button>
              </div>
              {promoError && <p className="promo-error">{promoError}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            color: '#ff6347',
            fontSize: '1.5rem',
            padding: '20px',
            border: '2px dashed #ff6347',
            borderRadius: '10px',
            backgroundColor: '#fff4f4',
            marginTop: '20px',
          }}
        >
          Cart is Empty
        </div>
      )}
    </>
  );
};

export default CartItems;
