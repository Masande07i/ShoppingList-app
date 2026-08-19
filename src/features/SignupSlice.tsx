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
        updateInput:(state, action : PayloadAction<string>) =>{
            state.email = action.payload;
            state.surname =action.payload;
            state.email = action.payload;
            state.password = action.payload;
            state.confirmPassword = action.payload
        }
    }
});

export const { updateInput} = SignupSlice.actions

export default SignupSlice.reducer