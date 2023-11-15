import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        cartTotalItems: 0,
        cartTotalPrice: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            if (!state.cart.includes(action.payload)) {
                state.cart.push(action.payload)
            }
        },
        deleteProduct: (state, action) => {
            const productIdToDelete = action.payload;
            state.cart = state.cart.filter(product => product.id !== productIdToDelete);
        },
        
    }
})


export const {login, logout, loadCart} = cartSlice.actions

export default cartSlice.reducer