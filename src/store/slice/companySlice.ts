import { companySliceProps } from "@/src/types/company";
import { Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: companySliceProps = {
  company: null,
  isLoading: false,
  error: null,
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const {setCompany} = companySlice.actions;

export default companySlice.reducer;
