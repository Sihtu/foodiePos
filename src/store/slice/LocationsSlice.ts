import { config } from "@/src/config";
import {
  CreateLocation,
  DeleteLocation,
  UpdateLocation,
} from "@/src/types/location";
import { MenuCategoryMenuSlice } from "@/src/types/menuCatagory";
import { Location, MenuCategoryMenu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LocationProp {
  locations: Location[];
  isLoading: boolean;
  error: Error | null;
}
const initialState: LocationProp = {
  locations: [],
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocatin",
  async (newLocation: CreateLocation, thunkApi) => {
    const { onSuccess } = newLocation;
    const respond = await fetch(`${config.backOfficeUrl}/location`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    const { location } = await respond.json();
    thunkApi.dispatch(addLocation(location));
    onSuccess && onSuccess();
  }
);

export const deleteLocationFunction = createAsyncThunk(
  "location/deleteLocation",
  async (location: DeleteLocation, thunkApi) => {
    const { id, onSuccess } = location;
    await fetch(`${config.backOfficeUrl}/location?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeLocation(id));
  }
);

export const updateLocationFunction = createAsyncThunk(
  "location/updateLocationFunction",
  async (location: UpdateLocation, thunkApi) => {
    const { onSuccess } = location;
    const respond = await fetch(`${config.backOfficeUrl}/location`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(location),
    });
    const {locations} = await respond.json();
    thunkApi.dispatch(replaceLocation(locations))
    onSuccess && onSuccess();
  }
);

const locationsSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter(
        (item) => item.id !== action.payload
      );
    },
    replaceLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setLocation, addLocation, removeLocation, replaceLocation } =
  locationsSlice.actions;
export default locationsSlice.reducer;
