import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const scoreResult = null;

const initialStateValue2 = {
  selectedRoomsAndDirection: {
    "North West": [],
    North: [],
    "North East": [],
    West: [],
    Centre: [],
    East: [],
    "South West": [],
    South: [],
    "South East": [],
  },
};


export const scoreSlice = createSlice({
  name: "score",
  initialState: { value: initialStateValue2, value2: scoreResult },
  reducers: {
    transferData: (state, action) => {
      state.value2 = action.payload;
    },
    addData: (state, action) => {
      if (action.payload.e) {
        for (let key in state.value.selectedRoomsAndDirection) {
          if (key === action.payload.direction) {
            state.value.selectedRoomsAndDirection[key].push(
              action.payload.roomName
            );
          }
        }
      } else {
        for (let key in state.value.selectedRoomsAndDirection) {
          if (key === action.payload.direction) {
            const indexValue = state.value.selectedRoomsAndDirection[
              key
            ].indexOf(action.payload.roomName);

            // state.value.selectedRoomsAndDirection((prevState) => ({
            //   ...prevState,
            //   key:
            state.value.selectedRoomsAndDirection[key].splice(indexValue, 1);
            // }));
          }
        }
      }
    },
    clearData: (state, action) => {
      state.value = initialStateValue2;
    },
  },
});

export const { transferData, addData, clearData } = scoreSlice.actions;

// export default scoreSlice.reducer;

const rootReducer = scoreSlice.reducer;

const persistConfig = {
  key: "root",
  storage,
};

export default persistReducer(persistConfig, rootReducer);
