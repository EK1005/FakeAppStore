// import redux toolkit to read store creation function
import { configureStore } from "@reduxjs/toolkit";

// read reducer from cartSlice 
import cartReducer from "./cartSlice";

//Start creating redux store 
export const store = configureStore({
    //register data group that will be used in Redux
    reducer: {
        // create state,cart area in the Redux
        cart: cartReducer
    },
});