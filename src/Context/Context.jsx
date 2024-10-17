// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { ToastContainer,toast } from 'react-toastify';
// // Create the context
// const DishesContext = createContext(null);
// const getDefaultCart=()=>{
//   let cart= {};
//   for (let i=0;i<300+1;i++){
//       cart[i]=0;
//   }
//   return cart;
// }

// // Provider component
// const ContextProvider = (props) => {
//   const [all_product, setAll_Product] = useState([]);
//   let [cartItems,setcartItems]=useState(getDefaultCart());
//   useEffect(() => {
//     fetch('http://localhost:4000/allproducts')
//       .then((res) => res.json())
//       .then((data) => setAll_Product(data));
//       if(localStorage.getItem('auth-token')){
//         fetch('http://localhost:4000/getcart',{
//             method:'POST',
//             headers: {
//                 Accept:'application/form-data',
//                 'auth-token':`${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json',},
//                 body:"",
//         }).then((res)=>res.json()).then((data)=>setcartItems(data))
//     }
//   }, []);
//   const addToCart=(itemId)=>{
//     setcartItems((prev)=>{
//         const newCartItems={...prev };
//         newCartItems[itemId] = newCartItems[itemId]+1;
//        //console.log(newCartItems);
//        if(localStorage.getItem('auth-token')){
//         fetch('http://localhost:4000/addtocart',{
//             method:'POST',
//             headers: {
//                 Accept:'application/form-data',
//                 'auth-token':`${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json'},
//             body: JSON.stringify({"itemId":itemId,}),
//             }).then((res)=>res.json()).then((data)=>{
//                 console.log(data);
//                 toast.success('added');
//             });
//        }
//        cartItems=newCartItems;
//         return newCartItems;
// })

// }
// const removeFromCart=(itemId)=>{
//     setcartItems((prev)=>{
//         const newCartItems={...prev };
//         newCartItems[itemId] = newCartItems[itemId]-1;
//        if(localStorage.getItem('auth-token')){
//         fetch('http://localhost:4000/removefromcart',{
//             method:'POST',
//             headers: {
//                 Accept:'application/form-data',
//                 'auth-token':`${localStorage.getItem('auth-token')}`,
//                 'Content-Type': 'application/json'},
//             body: JSON.stringify({"itemId":itemId,}),
//             }).then((res)=>res.json()).then((data)=>{
//                 console.log(data);
//             });
//        }
//         cartItems=newCartItems;
//         return newCartItems;
// })

// }

// const getTotalCartAmount = () => {
//   let totalAmount = 0;

//   // Check if cartItems and all_product are defined
//   if (!cartItems || !all_product) {
//       console.error("cartItems or all_product is not defined");
//       return totalAmount;
//   }

//   // Iterate over each item in cartItems
//   for (const item in cartItems) {
//       if (cartItems.hasOwnProperty(item)) {
//           if (cartItems[item] > 0) {
//               // Find the product based on item ID
//               const itemInfo = all_product.find((product) => product.id === Number(item));

//               // Check if itemInfo was found
//               if (itemInfo) {
//                   // Add the total amount for this item to totalAmount
//                   totalAmount += cartItems[item] * itemInfo.new_price;
//               } else {
//                   console.warn(`Item with ID ${item} not found in all_product`);
//               }
//           }
//       }
//   }

//   console.log(totalAmount);
//   return totalAmount;
// }

// const getTotalCartItems = () => {
//     let totalItem=0;
//     for (const item in cartItems){
//         if(cartItems[item]>0){
//             totalItem+= cartItems[item];
//         }
//     }
//     return totalItem;
// }
//   const contextValue = { getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart };

//   return (
//     <DishesContext.Provider value={contextValue}>
//       {props.children}
//       <ToastContainer />
//     </DishesContext.Provider>
//   );
// };

// // Custom hook to use the DishesContext
// export const useDishes = () => {
//   const context = useContext(DishesContext);
//   if (!context) {
//     throw new Error('useDishes must be used within a ContextProvider');
//   }
//   // return context.all_product;
//   return context;
// };

// export default ContextProvider;


import React, { createContext, useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Create the context
const DishesContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i <= 300; i++) {
        cart[i] = 0;
    }
    return cart;
};

// Provider component
const ContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:4000/allproducts');
                const data = await res.json();
                setAll_Product(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };

        const fetchCart = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const res = await fetch('http://localhost:4000/getcart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: "",
                    });
                    const data = await res.json();
                    setcartItems(data);
                } catch (error) {
                    console.error("Failed to fetch cart data", error);
                }
            }
        };

        fetchProducts();
        fetchCart();
    }, []);

    const addToCart = (itemId) => {
        setcartItems((prev) => {
            const newCartItems = { ...prev };
            newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;

            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/addtocart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "itemId": itemId }),
                })
                    .then((res) => res.json())
                    .then(() => {
                        toast.success('Added to cart');
                    });
            }

            return newCartItems;
        });
    };
 // Function to update the cart item quantity
 const updateCartItemQuantity = (id, newQuantity) => {
    setcartItems(prevCartItems => ({
      ...prevCartItems,
      [id]: newQuantity
    }));
  };
    const removeFromCart = (itemId) => {
        setcartItems((prev) => {
            const newCartItems = { ...prev };

            if (newCartItems[itemId] > 0) {
                newCartItems[itemId] -= 1;

                if (localStorage.getItem('auth-token')) {
                    fetch('http://localhost:4000/removefromcart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "itemId": itemId }),
                    })
                        .then((res) => res.json())
                        .then(() => {
                            toast.info('Removed from cart');
                        });
                }
            }

            return newCartItems;
        });
    };

    const getTotalCartAmount = () => {
      let totalAmount = 0;
    
      // Ensure cartItems and all_product are defined
      if (!cartItems || !all_product || all_product.length === 0) {
        console.error("cartItems or all_product is not defined or empty");
        return totalAmount;
      }
    
      // Iterate over each item in cartItems
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          // Find the product based on item ID
          const itemInfo = all_product.find((product) => product.id === Number(item));
    
          // Check if itemInfo was found
          if (itemInfo) {
            // Add the total amount for this item to totalAmount
            totalAmount += cartItems[item] * itemInfo.price;
          } else {
            console.warn(`Item with ID ${item} not found in all_product`);
          }
        }
      }
    
      //console.log(totalAmount);
      return totalAmount;
    }
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity 
    };

    return (
        <DishesContext.Provider value={contextValue}>
            {props.children}
            <ToastContainer />
        </DishesContext.Provider>
    );
};

// Custom hook to use the DishesContext
export const useDishes = () => {
    const context = useContext(DishesContext);
    if (!context) {
        throw new Error('useDishes must be used within a ContextProvider');
    }
    return context;
};

export default ContextProvider;

