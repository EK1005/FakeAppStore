import { createSlice } from "@reduxjs/toolkit";

//Make inside of cart initialize. This time will be expty
const initialState = {
    items: [],
};

//Create redux rule for cart 
const cartSlice = createSlice({
    //Set name of internal redux 
    name: "cart",
    //Set initial data 
    initialState,
    //writing data handling operation under reducer bracket
    reducers: {
    
        //Create add to cart operation in here 
        addToCart: (state, action) => 
        {
            //Collect product data which is sent by dispatch 
            const product = action.payload;

            //Find whether same product is in the cart or not 
            const existingItem = state.items.find(
                //Searching using by lamda and based on the product id
                (item) => item.id === product.id
            );

            //If server found same item in the cart, add 1 quantity
            if (existingItem) {
                existingItem.quantity += 1;
            }else
            {
                // If the item was new for cart, add item into cart array and set 1
                state.items.push({
                    ...product,
                    quantity: 1,
                });
            }


        },

    //Create incresing quantity function
    increaseQuantity: (state, action) => 
    {
        //collect product id which increase button was pressed 
        const productId = action.payload;
        // Finding the pressed item through the product id 
        const item = state.items.find((item) => item.id === productId);

        if(item) {
            //Then if item was found, set quantity +1 
            item.quantity += 1
        }
    },

    //By same procedure, set quantity -1 
    decreaseQuantity: (state, action) => 
    {
        const productId = action.payload;

        const item = state.items.find((item) => item.id === productId);

        if(item) {
            item.quantity -= 1;
        }

        state.items = state.items.filter((item) => item.quantity > 0);
    },

    //Removing the item from the cart no matther how many quantity is in the cart
    removeFromCart: (state, action) => 
    {
        const productId = action.payload;

        state.items = state.items.filter((item) => item.id !== productId);
    },

    clearCart: (state) => 
    {
        state.item = [];
    },
}});

export const 
{
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions

//Pass this reducer into store.js to reflect these oeprations in UI 
export default cartSlice.reducer;