import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/LoginSlice'
import signupReducer from '../features/SignupSlice'
import listReducer from '../features/ShoppingListSlice'
import itemReducer from '../features/ShoppingItemSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    shoppingList:listReducer,
    shoppingItem: itemReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

