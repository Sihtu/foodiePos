import { config } from "@/src/config";
import {
  CreateTable,
  DeleteTable,
  TableProps,
  UpdateTable,
} from "@/src/types/table";
import { prisma } from "@/src/utils/prisma";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TableProps = {
  tables: [],
  isLoading: false,
  error: null,
};

export const createdTable = createAsyncThunk(
  "table/createdTable",
  async (newTable: CreateTable, thunkApi) => {
    const { onSuccess } = newTable;
    const respond = await fetch(`${config.backOfficeUrl}/table`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    const { table } = await respond.json();
    thunkApi.dispatch(setTable(table));
    onSuccess && onSuccess();
  }
);

export const updateTable = createAsyncThunk(
  "table/createdTable",
  async (updateTable: UpdateTable, thunkApi) => {
    const { onSuccess } = updateTable;
    const respond = await fetch(`${config.backOfficeUrl}/table`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateTable),
    });
    const { table } = await respond.json();
    thunkApi.dispatch(replaceTable(table));
    onSuccess && onSuccess();
  }
);

export const deletedTable = createAsyncThunk(
  "table/deleteTable",
  async (deleteData: DeleteTable, thunkApi) => {
    const {id, onSuccess} = deleteData
    await fetch(`${config.backOfficeUrl}/table?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(deleteTable(id));
    onSuccess && onSuccess()
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setTable, addTable, replaceTable, deleteTable } = tableSlice.actions;
export default tableSlice.reducer;
