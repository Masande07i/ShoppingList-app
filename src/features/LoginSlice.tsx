import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

interface LoginState {
  user: UserData | null;
  profileInputs: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  passwordInputs: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  profileEditOpen: boolean;
  passwordEditOpen: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const savedUser = localStorage.getItem("loggedInUser");

const initialState: LoginState = {
  user: savedUser ? JSON.parse(savedUser) : null,

  profileInputs: {
    name: "",
    surname: "",
    email: "",
    phone: ""
  },

  passwordInputs: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  },

  profileEditOpen: false,
  passwordEditOpen: false,

  loading: false,
  error: null,
  success: false
};

export const loginUser = createAsyncThunk("login/loginUser",async (loginData: {email: string; password: string;},
    thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${loginData.email}&password=${loginData.password}`
      );
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const users = await response.json();

      if (users.length === 0) {
        return thunkAPI.rejectWithValue("Invalid email or password" );
      }

      return users[0];
    } catch (error) {
      return thunkAPI.rejectWithValue( error instanceof Error? error.message : "Something went wrong"
      );}}
);


const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    updateUser: (state,action: PayloadAction<UserData>) => {
      state.user = action.payload;
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(action.payload)
      );
    },

    openProfileEdit: (state) => {
      if (state.user) {
        state.profileInputs = {
          name: state.user.name,
          surname: state.user.surname,
          email: state.user.email,
          phone: state.user.phone
        };
      }
      state.profileEditOpen = true;
    },

    closeProfileEdit: (state) => {
      state.profileEditOpen = false;
    },

    updateProfileInputs: (state,action: PayloadAction<Partial<LoginState["profileInputs"]>>) => {
      state.profileInputs = {
        ...state.profileInputs,
        ...action.payload
      };
    },
    openPasswordEdit: (state) => {
      state.passwordEditOpen = true;
    },

    closePasswordEdit: (state) => {
      state.passwordEditOpen = false;
      state.passwordInputs = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      };
    },

    updatePasswordInputs: (state,action: PayloadAction<Partial<LoginState["passwordInputs"]>>) => {
      state.passwordInputs = {
        ...state.passwordInputs,
        ...action.payload
      };
    },

    logout: (state) => {
      state.user = null;
      state.error = null;
      state.success = false;

      localStorage.removeItem("loggedInUser");
    },
      clearForm: (state) => {
             state.user = initialState.user;
             state.error = null;
             state.success = false;},

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
        state.success = true;
        state.user = action.payload;

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(action.payload)
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          (action.payload as string) ||
          "Login failed";
      });
  }
});

export const {updateUser,openProfileEdit,closeProfileEdit,updateProfileInputs,openPasswordEdit,closePasswordEdit,updatePasswordInputs,logout,clearForm
} = loginSlice.actions;

export default loginSlice.reducer;