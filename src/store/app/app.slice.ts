import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppStoreState,
  FilterCredit,
  FilterRule
} from './app.state'
import { AccountDataExt } from 'src/model/data'

// #region State
const initialState: AppStoreState = {
  data: [],
  filterRule: 'ALL',
  filterCredit: 'ALL',
  filterSearch: '',
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

export interface PayloadSetFilterCredit {
  filter: FilterCredit
}
const setFilterCredit: CaseReducer<AppStoreState, PayloadAction<PayloadSetFilterCredit>> = (state, action) => {
  state.filterCredit = action.payload.filter
}

export interface PayloadSetFilterSearch {
  filter: string
}
const setFilterSearch: CaseReducer<AppStoreState, PayloadAction<PayloadSetFilterSearch>> = (state, action) => {
  state.filterSearch = action.payload.filter
}
// #endregion

// #region Slice
const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setData,
    setFilterRule,
    setFilterCredit,
    setFilterSearch,
  },
})
// #endregion

export default AppSlice
