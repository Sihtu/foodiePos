
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface OrderProps{
    order: Order[],
    isLoading: boolean
    error: Error | null
}

const initialState: OrderProps = {
    order: [],
    isLoading: false,
    error: null
}
const orderSlice =createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder : (state, action: PayloadAction<Order[]>)=> {
            state.order= action.payload
        }
    }
})

export const {setOrder} = orderSlice.actions
export default orderSlice.reducer