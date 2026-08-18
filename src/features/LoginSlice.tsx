import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginProps {
  email: string;
  password: string;
  formHasBeenSubmitted: boolean;
  formErrorMessage: string | null; 
}

const initialState: LoginProps = {
  email: '',
  password: '',
  formHasBeenSubmitted: false, 
  formErrorMessage: null       
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
      state.formHasBeenSubmitted = false;
      state.formErrorMessage = null;
    },
    setValidationError: (state, action: PayloadAction<string>) => {
      state.formErrorMessage = action.payload;
      state.formHasBeenSubmitted = true; 
    }
  }
});

export const { 
  updateEmailInput, 
  updatePasswordInput, 
  resetLoginForm, 
  setValidationError 
} = LoginSlice.actions;

export default LoginSlice.reducer;
