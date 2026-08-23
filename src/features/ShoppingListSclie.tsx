import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ShoppingItem {
  id?: number;
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
}

interface ShoppingListData {
  name: string;
  items: ShoppingItem[];
}

interface ShoppingListState extends ShoppingListData {
  shoppingLists: ShoppingListData[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ShoppingListState = {
  name: "",
  items: [],
  shoppingLists: [],
  loading: false,
  error: null,
  success: false,
};



export const addShoppingList = createAsyncThunk(
  "shoppingList/addShoppingList",
  async (shoppingListData: ShoppingListData, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:3000/lists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shoppingListData),
        }
      );

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

    updateListNameInput: (state, action) => {
      state.name = action.payload;
    },

    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearForm: (state) => {
      state.name = "";
      state.items = [];
    },

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

        state.name = "";
        state.items = [];
      })

      .addCase(addShoppingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});


export const {
  updateListNameInput,
  addItem,
  removeItem,
  clearForm,
} = shoppingListSlice.actions;


export default shoppingListSlice.reducer;