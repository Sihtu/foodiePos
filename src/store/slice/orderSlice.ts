import { config } from "@/src/config";
import { CreateOrder, OrderStatusUpdated, RefreshOrder } from "@/src/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emptyCart } from "./cartSlice";

export interface OrderProps {
  order: Order[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: OrderProps = {
  order: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder: CreateOrder, thunkApi) => {
    const { onSuccess } = newOrder;
    const respond = await fetch(`${config.orderAppApiUrl}/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    const data = await respond.json();
    const { orders } = data;
    thunkApi.dispatch(emptyCart());
    thunkApi.dispatch(setOrder(orders));
    onSuccess && onSuccess(orders);
  }
);

export const refreshOrder = createAsyncThunk(
  "order/refreshOrder",
  async ({ orderSeq }: RefreshOrder, thunkApi) => {
    const respond = await fetch(
      `${config.orderAppApiUrl}/order?orderSeq=${orderSeq}`
    );
    const { orders } = await respond.json();
    thunkApi.dispatch(setOrder(orders));
  }
);

export const orderStatusUpdated = createAsyncThunk("order/orderStatusUpdated",async ({itemId, status}: OrderStatusUpdated, thunkApi)=> {
  console.log("this is itemId from orderSlice",status)
  const respond = await fetch(`${config.backOfficeUrl}/order?itemId=${itemId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    }, 
    body: JSON.stringify(status)
  })
  const {orders} = await respond.json()
  thunkApi.dispatch(setOrder(orders))
})

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
