import React from "react";
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
 import Fav from '../../Components/FavDishes/Fav';
 import Map from '../../Components/Map/Map';
const Admin = () => {
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
            <Route path="/" element={<Fav/>} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="/listproduct" element={<ListProduct/>} />
            <Route path="/map" element={<Map/>}/>
        </Routes>
        {/* if route products valid then not show list products otherwise show */}

        
{/* Include the list of  What are the favorate dishes of which user and hide after any route works; */}
        </div>
    )
}
export default Admin
{/*i have to change the forms and also backend 
    this is for add dishes in the backend*/ }

