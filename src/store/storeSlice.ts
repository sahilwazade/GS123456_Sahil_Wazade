import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreDataType, storeData } from "../data/StoreData";

interface StoreState {
  stores: StoreDataType[];
}

const initialState: StoreState = {
  stores: storeData,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state) => {
      const maxSeqNo =
        state.stores.length > 0
          ? Math.max(...state.stores.map((store) => store["Seq No."]))
          : 0;

      const newItem: StoreDataType = {
        "Seq No.": maxSeqNo + 1,
        ID: `temp-${Date.now()}`,
        Label: "",
        City: "",
        State: "",
      };

      state.stores = [newItem, ...state.stores];
    },

    deleteStore: (state, action: PayloadAction<number>) => {
      const index = state.stores.findIndex(
        (store) => store["Seq No."] === action.payload
      );
      if (index !== -1) {
        state.stores.splice(index, 1);
      }
    },

    updateStore: (state, action) => {
      const index = state.stores.findIndex(
        (store) => String(store["Seq No."]) === String(action.payload["Seq No."])
      );

      if (index !== -1) {
        state.stores[index] = {
          ...state.stores[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addStore, deleteStore, updateStore } = storeSlice.actions;
export default storeSlice.reducer;
