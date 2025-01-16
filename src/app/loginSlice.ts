import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ILogin } from './interfaces'



const initialState: ILogin = {
  name: '',
  role: 'user'
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  
    getLogin: (state, action: PayloadAction<ILogin>) => {
      state = {...state, name: action.payload.name, role: action.payload.role}
    },
  },
})

// Action creators are generated for each case reducer function
export const {getLogin } = loginSlice.actions

export default loginSlice.reducer