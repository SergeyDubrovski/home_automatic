import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IHome, ITimer } from './interfaces'

type TSensors = {state : IHome}
export const apiHomeReducer = createApi({
  reducerPath: 'apiHomeReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/esp' }),
  tagTypes: <string[]>['Post'],
  endpoints: (builder) => ({
    sendTimer: builder.mutation<string, ITimer>({
      invalidatesTags : ['Post'],
      query(body) {
        
        return {
          url: `house`,
          method: 'POST',
          body,
          
        }
      },
    }),
    takeSensors: builder.query<TSensors, undefined> ({
      providesTags: ['Post'],
      query() {
        return {
          url:`house`,
          
        }
        
      },
      
    })
  }),
  
})


export const { useSendTimerMutation, useTakeSensorsQuery } = apiHomeReducer