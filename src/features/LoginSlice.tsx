import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserData } from "./SignupSlice";

interface LoginState {
 user: UserData | null;
 loading :boolean;
 error :string | null
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,

};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (
    loginData: Pick<UserData, "email" | "password">,
    thunkAPI
  ) => {
    if (!loginData.email) {
      return thunkAPI.rejectWithValue("Email is required.");
    }

    if (!loginData.password) {
      return thunkAPI.rejectWithValue("Password is required.");
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${loginData.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }

      const users: UserData[] = await response.json();

      if (users.length === 0) {
        return thunkAPI.rejectWithValue(
          "User is not registered. Please sign up first."
        );
      }

      const user = users[0];

      if (user.password !== loginData.password) {
        return thunkAPI.rejectWithValue("Incorrect password.");
      }

      return user;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
     clearForm: (state) => {
             state.user = initialState.user;
             state.error = null;
             },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
        
      });
  },
});


export default loginSlice.reducer;