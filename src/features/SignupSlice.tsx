import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

export interface UserData {
  id: string
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface SignupState {
  inputs: UserData;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SignupState = {
  inputs: {
   id:'',
   name: '',
   surname: '',
   email: '',
   phone: '',
   password: '',
   confirmPassword: '',
},
  loading: false,
  error: null,
  success: false,
};

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const signupUser = createAsyncThunk('signup/signupUser',async (userData: UserData, thunkAPI) => {
  try {
       const checkResponse = await fetch( `http://localhost:3000/users?email=${encodeURIComponent(userData.email)}`);
      if (!checkResponse.ok) {
        throw new Error("Failed to check email");
      }
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        return thunkAPI.rejectWithValue(
          "An account with this email already exists"
        );
      }
          const hashedPassword = await hashPassword(userData.password);
           const userToSave = {...userData,password: hashedPassword,confirmPassword: '', };
           
           const response = await fetch('http://localhost:3000/users', {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json',
                  },
           body: JSON.stringify(userToSave),});
             if (!response.ok) {
                throw new Error('Failed to create account');
                }
                  return await response.json();
                 } catch (error) {
                         return thunkAPI.rejectWithValue(
                   error instanceof Error ? error.message : 'Something went wrong'
                   );
}});


export const signupSlice = createSlice({
    name: 'signup',
    initialState,
     reducers: {
        updateRegister: (state, action: PayloadAction<Partial<UserData>>) => {
          state.inputs = { ...state.inputs, ...action.payload };
},
        clearForm: (state) => {
         state.inputs = initialState.inputs;
         state.error = null;
         state.success = false;},
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

export const { updateRegister, clearForm } = signupSlice.actions;
export default signupSlice.reducer;