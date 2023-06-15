import { createAsyncThunk } from '@reduxjs/toolkit'
import statisticsAPI from '../../api/statisticsAPI'

export const getMasterStatisticsThunk = createAsyncThunk(
  'statistics/getMasterStatistics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await statisticsAPI.getMastersStatistics(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
