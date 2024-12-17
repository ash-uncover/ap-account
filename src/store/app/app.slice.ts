import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppStoreState,
  FilterCredit,
  FilterRule,
  Labels
} from './app.state'
import { AccountDataExt } from 'src/model/data'

// #region State
const initialState: AppStoreState = {
  data: [],
  labels: { credit: {}, debit: {} },
  filterRule: 'ALL',
  filterCredit: 'ALL',
  filterSearch: '',
  filterAccount: '',
  filterFile: '',
}
// #endregion

// #region Reducers
export interface PayloadSetData {
  data: AccountDataExt[]
}
const setData: CaseReducer<AppStoreState, PayloadAction<PayloadSetData>> = (state, action) => {
  state.data = action.payload.data
}

export interface PayloadSetLabels {
  labels: Labels
}
const setLabels: CaseReducer<AppStoreState, PayloadAction<PayloadSetLabels>> = (state, action) => {
  state.labels = action.payload.labels
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

export interface PayloadSetFilterAccount {
  filter: string
}
const setFilterAccount: CaseReducer<AppStoreState, PayloadAction<PayloadSetFilterAccount>> = (state, action) => {
  state.filterAccount = action.payload.filter
}

export interface PayloadSetFilterFile {
  filter: string
}
const setFilterFile: CaseReducer<AppStoreState, PayloadAction<PayloadSetFilterFile>> = (state, action) => {
  state.filterFile = action.payload.filter
}

// #endregion

// #region Slice
const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setData,
    setLabels,

    setFilterRule,
    setFilterCredit,
    setFilterSearch,
    setFilterAccount,
    setFilterFile,
  },
})
// #endregion

export default AppSlice
