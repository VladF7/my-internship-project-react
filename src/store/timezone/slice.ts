import { createSlice } from '@reduxjs/toolkit'

interface TimezoneState {
  timezone: string
  timezoneOffset: number
}

const initialState: TimezoneState = {
  timezone: '',
  timezoneOffset: 0
}

export const timezoneSlice = createSlice({
  name: 'timezone',
  initialState,
  reducers: {
    setClientTimeZone(state) {
      state.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      state.timezoneOffset = new Date().getTimezoneOffset()
    }
  }
})

export const { setClientTimeZone } = timezoneSlice.actions

export default timezoneSlice.reducer