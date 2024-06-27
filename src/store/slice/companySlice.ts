import { config } from "@/src/config";
import { UpdateCompany, companySliceProps } from "@/src/types/company";
import { Company } from "@prisma/client";
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState: companySliceProps = {
  company: null,
  isLoading: false,
  error: null,
};

export const updatedCompany = createAsyncThunk(
  "company/updatedCompany",
  async (updateData: UpdateCompany, thunkApi) => {
    const { onSuccess } = updateData;
    const respond = await fetch(`${config.backOfficeUrl}/company`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const { company } = await respond.json();
    thunkApi.dispatch(setCompany(company));
    onSuccess && onSuccess();
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
