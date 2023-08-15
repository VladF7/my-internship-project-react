import { createAsyncThunk } from '@reduxjs/toolkit'
import statisticsAPI from '../../api/statisticsAPI'
import {
  IMasterStatisticRequestParams,
  IMastersStatisticAndCount
} from '../../types/statistic.types'
import { IThunkError } from '../../types'

export const getMasterStatisticsThunk = createAsyncThunk<
  IMastersStatisticAndCount,
  IMasterStatisticRequestParams,
  { rejectValue: IThunkError }
>('statistics/getMasterStatistics', async (data, { rejectWithValue }) => {
  try {
    const response = await statisticsAPI.getMastersStatistics(data)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
