import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SignupProps{
    name: string;
    surname: string;
    email : string;
    phone: string;
    password:string;
    confirmPassword: string
}

const initialState: SignupProps={
    name : '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword :''
}
export const SignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers :{
        updateNameInput:(state, action : PayloadAction<string>) =>{
            state.name = action.payload;
        },
         updateSurnameInput:(state, action : PayloadAction<string>) =>{
            state.surname =action.payload;
        },
         updateEmailInput:(state, action : PayloadAction<string>) =>{
           state.email = action.payload;
        },
         updatePhoneInput:(state, action : PayloadAction<string>) =>{
           state.phone = action.payload;
        },
        updatePasswordInput:(state, action : PayloadAction<string>) =>{
            state.password = action.payload;
        },
        updateConfirmPasswordInput:(state, action : PayloadAction<string>) =>{
             state.confirmPassword = action.payload;
        },
    }
});

export const { updateNameInput, updateSurnameInput,updateEmailInput,updatePhoneInput,updatePasswordInput, updateConfirmPasswordInput} = SignupSlice.actions

export default SignupSlice.reducer