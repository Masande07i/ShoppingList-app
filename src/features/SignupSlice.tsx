import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface UserData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface SignupState extends UserData {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SignupState = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  loading: false,
  error: null,
  success: false,
};

export const signupUser = createAsyncThunk("signup/signupUser",
  async (userData: UserData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateNameInput: (state, action) => {
         state.name = action.payload; },
    updateSurnameInput: (state, action) => {
         state.surname = action.payload; },
    updateEmailInput: (state, action) => { 
        state.email = action.payload; },
    updatePhoneInput: (state, action) => {
         state.phone = action.payload; },
    updatePasswordInput: (state, action) => {
         state.password = action.payload; },
    updateConfirmPasswordInput: (state, action) => { 
        state.confirmPassword = action.payload; },
    clearForm: (state) => {
      state.name = "";
      state.surname = "";
      state.email = "";
      state.phone = "";
      state.password = "";
      state.confirmPassword = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const {updateNameInput,updateSurnameInput,updateEmailInput,updatePhoneInput,updatePasswordInput,updateConfirmPasswordInput,clearForm
} = signupSlice.actions;

export default signupSlice.reducer;