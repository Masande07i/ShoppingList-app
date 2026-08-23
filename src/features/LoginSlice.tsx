import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserData {

  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

interface LoginState {
  email: string;
  password: string;
  user: UserData | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: LoginState = {
  email: "",
  password: "",
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const loginUser = createAsyncThunk("login/loginUser", async (
    loginData: { email: string; password: string },
    thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(loginData.email )}`,
        {
          method: "GET",
        }
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
        return thunkAPI.rejectWithValue(
          "Incorrect password."
        );
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
    updateEmailInput: (state, action) => {
      state.email = action.payload;
    },

    updatePasswordInput: (state, action) => {
      state.password = action.payload;
    },

    clearLoginForm: (state) => {
      state.email = "";
      state.password = "";
      state.error = null;
      state.success = false;
    },

    logout: (state) => {
      state.user = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const {
  updateEmailInput,
  updatePasswordInput,
  clearLoginForm,
  logout,
} = loginSlice.actions;

export default loginSlice.reducer;