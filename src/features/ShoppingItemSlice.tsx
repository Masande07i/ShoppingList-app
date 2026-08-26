import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ShoppingItem {
  id?: string;
  userId: string;
  listId: string;
  name: string;
  category: string;
  notes?: string;
}

interface ShoppingItemState {
  inputs: ShoppingItem;
  items: ShoppingItem[];
  editingItem:ShoppingItem | null;
  loading:boolean;
  error: string | null;
  success: boolean;
}

const initialState: ShoppingItemState = {
  inputs: {
    name: "",
    category: "",
    notes: "",
    userId: "",
    listId: ""
  },
  items: [],
  editingItem:null,
  loading: false,
  error: null,
  success: false
};

export const addShoppingItem = createAsyncThunk("shoppingItem/addShoppingItem",async (shoppingItem: ShoppingItem, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingItem)
      });

      if (!response.ok) {
        throw new Error("Failed to create shopping item");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error? error.message: "Something went wrong");
    }}
);

export const fetchShoppingItems = createAsyncThunk("shoppingItem/fetchShoppingItems",async (listId: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/items?listId=${listId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shopping items");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error? error.message: "Something went wrong");
    }}
);

export const deleteShoppingItem = createAsyncThunk("shoppingItem/deleteShoppingItem",async (id: string, thunkAPI) => {
    try {
      const response = await fetch( `http://localhost:3000/items/${id}`,
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
    }}
)
export const updateShoppingItem = createAsyncThunk("shoppingItem/updateShoppingItem",async(shoppingItem:ShoppingItem, thunkAPI)=>{
  try{
    const response = await fetch (`http://localhost:3000/items/${shoppingItem.id}`,
    {
      method: "PATCH",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        name: shoppingItem.name,
        category :shoppingItem.category,
        notes: shoppingItem.notes,
        userId: shoppingItem.userId,
        listId:shoppingItem.listId
      })

    });
    if (!response.ok){
      throw new Error("Failed to update shopping list");
    }
    return await response.json();
  }catch (error){
    return thunkAPI.rejectWithValue(error instanceof Error? error.message:"Something went wrong")
  }});



const shoppingItemSlice = createSlice({
  name: "shoppingItem",
  initialState,
  reducers: {
    updateItemInputs: (
      state,
      action: PayloadAction<Partial<ShoppingItem>>
    ) => {
      state.inputs = {
        ...state.inputs,
        ...action.payload
      };
    },

    clearItemForm: (state) => {
      state.inputs = {
        name: "",
        category: "",
        notes: "",
        userId: "",
        listId: ""
      };
    },
    setEditingItem: (state, action: PayloadAction<ShoppingItem>)=>{
      state.editingItem = action.payload;
      state.inputs={
        name: action.payload.name,
        category: action.payload.category,
        notes: action.payload.notes,
        userId: action.payload.userId,
        listId: action.payload.listId,
        id: action.payload.id
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addShoppingItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(addShoppingItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload);
        state.inputs = {
          name: "",
          category: "",
          notes: "",
          userId: "",
          listId: ""
        };
      })
      .addCase(addShoppingItem.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          (action.payload as string) ||
          "Failed to add shopping item";
      })

builder
      .addCase(fetchShoppingItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShoppingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchShoppingItems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          "Failed to fetch shopping items";
      })

builder
      .addCase(deleteShoppingItem.pending, (state) => {
       state.loading = true;
       state.error = null;
       })

      .addCase(deleteShoppingItem.fulfilled, (state, action) => {
       state.loading = false;
       state.success = true;
       state.items = state.items.filter( (item) => item.id !== action.payload);
       })
      .addCase(deleteShoppingItem.rejected, (state, action) => {
       state.loading = false;
       state.success = false;
       state.error =
       (action.payload as string) ||
      "Failed to delete shopping item";
     })

builder
       .addCase(updateShoppingItem.pending,(state) =>{
        state.loading =true;
        state.error = null;
        state.success = false;
       })
       .addCase(updateShoppingItem.fulfilled,(state,action)=>{
        state.loading = false;
        state.success = true;
        const index = state.items.findIndex((item)=>  item.id === action.payload.id);
        if (index !== -1){
          state.items[index]= action.payload;
        }
        state.editingItem = null;
        state.inputs ={
          name : "",
          category: "",
          notes:"",
          userId: "",
          listId: ""
        };

       })
       .addCase(updateShoppingItem.rejected,(state,action)=>{
        state.loading= false;
        state.success = false;
        state.error= (action.payload as string) || "Failed to update shopping list";
       });
  }
});

export const {updateItemInputs,clearItemForm,setEditingItem} = shoppingItemSlice.actions;

export default shoppingItemSlice.reducer;