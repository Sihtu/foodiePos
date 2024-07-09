import { CartItem, CartSliceProps } from "@/src/types/cart";
import { Addon, Menu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const initialState: CartSliceProps = {
    item: [],
    isLoading: false,
    error: null
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>)=> {
            const exist = state.item.find((item)=> item.id === action.payload.id)
            if(exist){
                state.item = state.item.map((item)=> item.id=== action.payload.id? action.payload: item)
            }else{
                state.item = [...state.item, action.payload]
             }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>)=> {
            state.item = state.item.filter((item)=> item.id !== action.payload.id)
        },
        emptyCart: (state)=> {
            state.item = []
        }

    }
})

export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions
export default cartSlice.reducer