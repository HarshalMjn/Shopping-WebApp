import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard"
import Paymentpage from "./pages/Paymentpage";
import Success from "./pages/Success";



const App = () => {
  return (<div>
        <div className="bg-slate-900">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} 
          
           
          
          />
          
         
          <Route path ="/Login" element={<LogIn/>} 
          />
           <Route path ="/signup" element={<SignUp/>} />

           <Route path ="/dashboard" element={<Dashboard/>} />

           <Route path="cart/payment" element={<Paymentpage/>}></Route>
           <Route path="/success" element={<Success />} />
           {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
  </div>)
};

export default App;
