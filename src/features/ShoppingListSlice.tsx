import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ShoppingList {
  id?: string;
  userId: string;
  name: string;
  category: string;
  notes?: string;
}

interface ShoppingListState {
  inputs: ShoppingList;
  shoppingLists: ShoppingList[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ShoppingListState = {
  inputs: {
    name: "",
    category: "",
    notes: "",
    userId: ""
  },
  shoppingLists: [],
  loading: false,
  error: null,
  success: false
};

export const addShoppingList = createAsyncThunk(
  "shoppingList/addShoppingList",
  async (shoppingList: ShoppingList, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingList)
      });

      if (!response.ok) {
        throw new Error("Failed to create shopping list");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    updateInputs: (
      state,
      action: PayloadAction<Partial<ShoppingList>>
    ) => {
      state.inputs = {
        ...state.inputs,
        ...action.payload
      };
    },

    clearForm: (state) => {
      state.inputs = {
        name: "",
        category: "",
        notes: "",
        userId: ""
      };
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addShoppingList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.shoppingLists.push(action.payload);

        state.inputs = {
          name: "",
          category: "",
          notes: "",
          userId: ""
        };
      })
      .addCase(addShoppingList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          (action.payload as string) ||
          "Failed to add shopping list";
      });
  }
});

export const {
  updateInputs,
  clearForm
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;