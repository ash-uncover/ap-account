import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppStoreState,
  FilterRule
} from './app.state'
import { AccountDataExt } from 'src/model/data'

// #region State
const initialState: AppStoreState = {
  data: [],
  filterRule: 'ALL'
}
// #endregion

// #region Reducers
export interface PayloadSetData {
  data: AccountDataExt[]
}
const setData: CaseReducer<AppStoreState, PayloadAction<PayloadSetData>> = (state, action) => {
  state.data = action.payload.data
}

export interface PayloadSetFilterRule {
  filter: FilterRule
}
const setFilterRule: CaseReducer<AppStoreState, PayloadAction<PayloadSetFilterRule>> = (state, action) => {
  state.filterRule = action.payload.filter
}
// #endregion

// #region Slice
const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setData,
    setFilterRule
  },
})
// #endregion

export default AppSlice
