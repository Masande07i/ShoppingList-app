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
  editingList: ShoppingList | null;
  showAddList: boolean;
  searchQuery: string;
  sortOption: string;
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
  editingList: null,
  showAddList: false,
  searchQuery: "",
  sortOption: "newest",
  loading: false,
  error: null,
  success: false
};

export const addShoppingList = createAsyncThunk("shoppingList/addShoppingList",async (shoppingList: ShoppingList, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/lists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(shoppingList)
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create shopping list");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Something went wrong" );
    }});


export const fetchShoppingLists = createAsyncThunk("shoppingList/fetchShoppingLists",async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/lists");
      if (!response.ok) {
        throw new Error("Failed to fetch shopping lists");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error? error.message : "Something went wrong" );
    }});


export const deleteShoppingList = createAsyncThunk("shoppingList/deleteShoppingList",async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/lists/${id}`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete shopping item");
      }
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error? error.message: "Something went wrong");
    }});


export const updateShoppingList = createAsyncThunk("shoppingList/updateShoppingList",async (shoppingList: ShoppingList, thunkAPI) => {
    try {
      const response = await fetch( `http://localhost:3000/lists/${shoppingList.id}`,
        {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name: shoppingList.name,
            category: shoppingList.category,
            notes: shoppingList.notes,
            userId: shoppingList.userId
          })
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update shopping list");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error? error.message: "Something went wrong");
    }});



const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    updateInputs: (state,action: PayloadAction<Partial<ShoppingList>>) => {
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
    },
     openAddList: (state) => {state.showAddList = true;
      state.editingList = null;
    },
    closeAddList: (state) => {
      state.showAddList = false;
      state.editingList = null;
      state.inputs = {
        name: "",
        category: "",
        notes: "",
        userId: ""
      };
    },
    setEditingList: (state,action: PayloadAction<ShoppingList>) => {
      state.editingList = action.payload;
      state.showAddList = true;
      state.inputs = {
        name: action.payload.name,
        category: action.payload.category,
        notes: action.payload.notes || "",
        userId: action.payload.userId,
        id: action.payload.id
      };
    },
    updateSearchQuery:(state,action: PayloadAction<string>) =>{
      state.searchQuery = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
     state.sortOption = action.payload;
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
        state.error =(action.payload as string) ||"Failed to add shopping list";})

 builder
      .addCase(fetchShoppingLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchShoppingLists.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingLists = action.payload;
      })
      .addCase(fetchShoppingLists.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          "Failed to fetch shopping lists";
      })

builder
       .addCase(deleteShoppingList.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
       .addCase(deleteShoppingList.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.shoppingLists = state.shoppingLists.filter( (item) => item.id !== action.payload);
      })
        .addCase(deleteShoppingList.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error =(action.payload as string) ||"Failed to delete shopping item";
      })

builder
 .addCase(updateShoppingList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateShoppingList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index =state.shoppingLists.findIndex((list) => list.id === action.payload.id);
        if (index !== -1) {
          state.shoppingLists[index] = action.payload;
        }
        state.editingList = null;
        state.showAddList = false;
        state.inputs = {
          name: "",
          category: "",
          notes: "",
          userId: ""
        };
      })
      .addCase(updateShoppingList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =(action.payload as string) ||"Failed to update shopping list";});


  }
});

export const {updateInputs,clearForm,openAddList,closeAddList,setEditingList,updateSearchQuery,setSortOption} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;