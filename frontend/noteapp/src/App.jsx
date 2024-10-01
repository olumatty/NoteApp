import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Signup from "./Page/Signup/Signup";


const App = () => {
  return ( 
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/signup" element={<Signup/>}/>
      </Routes>
      
      </BrowserRouter>
      
    </div>
   );
}
 
export default App;