import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from './Pages/Admin/Admin';
import { Toaster } from 'react-hot-toast';
const App=()=>{
return(
  <div>
<Navbar/>
<Toaster/>
<Admin/>
  </div>
)
}
export default App