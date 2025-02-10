import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginSlice'
import { apiHomeReducer } from './apiHomeReducer'
import  homeReducer  from './homeSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    home : homeReducer,
    [apiHomeReducer.reducerPath] : apiHomeReducer.reducer
  },
  middleware: (getDefaultMiddleware) => {
    console.log('ddddd');
    
   return getDefaultMiddleware().concat(apiHomeReducer.middleware)}
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch