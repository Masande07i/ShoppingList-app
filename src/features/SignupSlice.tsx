import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User{
    name: string;
    surname: string;
    email : string;
    phone: string;
    password:string;
    confirmPassword: string
}

const initialState: User={
    name: '',
    surname: '',
    email : '',
    phone: '',
    password:'',
    confirmPassword: ''
}
export const SignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers :{
        registerUser:(state, action : PayloadAction<User>) =>{

            // state.name=action.payload.name;
            // state.surname=action.payload.surname;
            // state.email=action.payload.email;
            // state.phone=action.payload.phone;
            // state.password=action.payload.password;
            // state.confirmPassword=action.payload.confirmPassword;
        },
         updateNameInput:(state, action : PayloadAction<string>) =>{
            state.name =action.payload;
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

export const { registerUser, updateNameInput, updateSurnameInput,updateEmailInput,updatePhoneInput,updatePasswordInput,updateConfirmPasswordInput} = SignupSlice.actions

export default SignupSlice.reducer