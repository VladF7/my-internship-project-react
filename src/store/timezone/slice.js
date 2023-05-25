import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timezone: '',
  timeZoneOffset: ''
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
