import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Success from './Pages/Success/Success';
import MainMenu from './Pages/MainMenu/MainMenu';
import Product from './Pages/Products/Product';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import './App.css'
import LoginSignup from './Pages/LoginSignup/LoginSignup';
import Feedback from './Pages/Feedback/Feedback';
import ContextProvider from './Context/Context';
import ListReservation from './components/ListReservation';
const App = () => {
  return (
    <>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/menu' element={<MainMenu/>}/>
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/success' element={<Success/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path='/feed' element={<Feedback/>}/>
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/listReservation' element={<ListReservation/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Toaster/>
      </Router>
      </ContextProvider>
  
    </>
  )
}

export default App



//task1
// our next work is to do like zomato delivery user can choose the dish and pay for it not only reserve the resturent.
//task 2
//maintain in the backend what a user eat most and then show this into top list
//task 3
//include ai talk in the for customer care and other information
//task 4
//include voice note type that they write will speak ... used at the time of payment.


////new task add chatbot in the team and also add me and antriksh photos
