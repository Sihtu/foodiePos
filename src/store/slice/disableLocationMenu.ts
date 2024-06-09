import { DisableLocationMenuPorps } from "@/src/types/menu";
import { DisabledLocationMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: DisableLocationMenuPorps={
    disableLocationMenu: [],
    isLoading: false,
    error: null
}
const disableLocationMenus = createSlice({
    name: "disableLocationMenu", 
    initialState,
    reducers: {
        setDisableLocationMenu: (state, action: PayloadAction<DisabledLocationMenu[]>)=> {
            state.disableLocationMenu = action.payload
        }
    }
})

export const {setDisableLocationMenu} = disableLocationMenus.actions
export default disableLocationMenus.reducer