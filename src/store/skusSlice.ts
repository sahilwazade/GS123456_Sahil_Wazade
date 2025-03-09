import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkusDataTypes, skusData } from "../data/SKUsData";

interface SkuState {
  skus: SkusDataTypes[];
}

const initialState: SkuState = {
  skus: skusData,
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    addSku: (state) => {
      const extractNumber = (seqNo: string): number => {
        const match = seqNo.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const maxSeqNo =
        state.skus.length > 0
          ? Math.max(...state.skus.map((sku) => extractNumber(sku.ID)))
          : 0;

      const newSeqNo = `SK${String(maxSeqNo + 1).padStart(5, "0")}`;

      const newItem: SkusDataTypes = {
        ID: newSeqNo,
        Label: "",
        Class: "",
        Department: "",
        Price: 0,
        Cost: 0,
      };
      state.skus = [newItem, ...state.skus];
    },
    deleteSku: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        return;
      }
      state.skus = state.skus.filter((sku) => sku.ID !== action.payload);
    },

    updateSku: (state, action) => {
      const index = state.skus.findIndex((sku) => sku.ID === action.payload.id);
      if (index !== -1) {
        state.skus[index] = {
          ...state.skus[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addSku, deleteSku, updateSku } = skuSlice.actions;
export default skuSlice.reducer;
