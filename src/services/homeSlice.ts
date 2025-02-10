import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IHome } from './interfaces'
import { RootState } from './store'




const initialState: IHome = {
    Sensor1: 1,
    Sensor2: 1,
    Sensor3: 1,
    Motor: false
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
  
    getHomeSensors: (state, action: PayloadAction<IHome>) => {
        console.log(action.payload);
        
       state.Motor = action.payload.Motor
    },
  },
})

// Action creators are generated for each case reducer function
export const {getHomeSensors } = homeSlice.actions
export const selecthome = (state: RootState) => state.home
export default homeSlice.reducer