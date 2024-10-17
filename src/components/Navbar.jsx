// import React, { useState,useEffect } from "react";
// import { data } from "../restApi.json";
// import { useDishes } from "../Context/Context";
// import { Link } from "react-scroll";
// import cart_icon from "../../public/cart_icon.png"
// import { useNavigate } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const d=useDishes();
//   const getTotalCartItems=d.getTotalCartItems;
//  const [user,setUser]=useState('');
//   const navigate=useNavigate();
//   const handleMenuClick=()=>{
//     navigate('/menu');
//   }
// const userHandler=()=>{
//   navigate('/login');
//  }
//  useEffect(() => {
//   const authToken = localStorage.getItem('auth-token');
//   if (authToken) {
//     const storedUser = localStorage.getItem('user');
//     setUser(storedUser);
//   }
// }, []);
//   return (
//     <>
//       <nav>
//         <div className="logo">{!localStorage.getItem('auth-token') ? "Welcome "+user :user}</div>
//         {/* <div className="logo">Welcome User</div> */}
//         <div className={show ? "navLinks showmenu" : "navLinks"}>
//           <div className="links">
//             {data[0].navbarLinks.map((element) => (
//               <Link
//                 to={element.link}
//                 spy={true}
//                 smooth={true}
//                 duration={500}
//                 key={element.id}
//               >
//                 {element.title}
//               </Link>
//             ))}
//           </div>
//           {localStorage.getItem('auth-token')
//            ?<button className="menuBtn" onClick={()=>{localStorage.removeItem('auth-token');setUser('');window.location.replace('/')}}>Logout</button>:

//           <button className="menuBtn" onClick={userHandler}>Login/SignUP</button>}
//            <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
//            <div className="nav-cart-count">{getTotalCartItems()}</div>
//         {/* now add code to handle login signup and logout here in UserHandler function  and first login then registration 
//           and it will also contain what dishes we are ordered most so for this we have to store dishes
//            in each selction and also selection of dishes and payment n all and i also want email verification in it */}
//           <button className="menuBtn" onClick={handleMenuClick}>OUR MENU</button>
//         </div>
//         <div className="hamburger" onClick={()=> setShow(!show)}>
//                 <GiHamburgerMenu/>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;





import React, { useState, useEffect } from "react";
import { data } from "../restApi.json";
import { useDishes } from "../Context/Context";
import { Link } from "react-scroll"; // Keep this for other navigation links
import cart_icon from "../../public/cart_icon.png";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../app.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const d = useDishes();
  const getTotalCartItems = d.getTotalCartItems;
  const [user, setUser] = useState('');
  const navigate = useNavigate();
const handleClick=()=>{
  navigate('/listReservation');
}
  const handleMenuClick = () => {
    navigate('/menu');
  }

  const userHandler = () => {
    navigate('/login');
  }

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  }

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <nav>
        <div className="logo" onClick={handleClick}>{!localStorage.getItem('auth-token') ? "Welcome " + user : user}</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          {/* Add onClick handler to navigate to cart */}
          <img src={cart_icon} alt="cart" onClick={handleCartClick} className="cart-icon" />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
          {localStorage.getItem('auth-token')
            ? <button className="menuBtn" onClick={() => { localStorage.removeItem('auth-token'); setUser(''); localStorage.removeItem('email');window.location.replace('/') }}>Logout</button>
            : <button className="menuBtn" onClick={userHandler}>Login/SignUP</button>}
          
          

          <button className="menuBtn" onClick={handleMenuClick}>OUR MENU</button>
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
