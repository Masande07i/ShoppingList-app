import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginProps {
  email: string;
  password: string;
  
}

const initialState: LoginProps = {
  email: '',
  password: '',
      
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateEmailInput: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePasswordInput: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetLoginForm: (state) => {
      state.email = '';
      state.password = '';
    }
  }
});

export const { updateEmailInput, updatePasswordInput, resetLoginForm } = LoginSlice.actions;

export default LoginSlice.reducer;
