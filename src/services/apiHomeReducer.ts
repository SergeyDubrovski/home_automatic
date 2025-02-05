import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITimer } from './interfaces'

export const apiHomeReducer = createApi({
  reducerPath: 'apiHomeReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/esp' }),
  endpoints: (builder) => ({
    sendTimer: builder.mutation<string, ITimer>({
      query(body) {
        return {
          url: `house`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})


export const { useSendTimerMutation } = apiHomeReducer