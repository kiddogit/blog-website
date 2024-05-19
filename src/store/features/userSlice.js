import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: localStorage.getItem('auth-user') 
  ? JSON.parse(localStorage.getItem('auth-user'))
  : null,
}

const userSlice =  createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ADD_USER: (state, action) => {
      state.user = action.payload
      localStorage.setItem('auth-user', JSON.stringify(action.payload))
    },
   REMOVE_USER: state => {
    state.user = null
    localStorage.removeItem('auth-user')
   },
  }
})

export const { ADD_USER, REMOVE_USER } = userSlice.actions
export const userReducer = userSlice.reducer
