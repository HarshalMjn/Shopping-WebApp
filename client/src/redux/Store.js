import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";
 import {UserSlice} from "./Slices/UserSlice"


export const store = configureStore({
    reducer:{
        cart: CartSlice.reducer,
        user: UserSlice.reducer,
        
        
        

        
    
        
        
        
    },
   
});