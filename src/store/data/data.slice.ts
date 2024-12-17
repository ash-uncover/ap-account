import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { 
  DataStates 
} from '@uncover/js-utils'

import { 
  DataStoreState
} from './data.state'
import { 
  AccountData, 
  AccountMetaData, 
  AccountRule
} from '../../model/data'

// #region State
const initialState: DataStoreState = {
  data: [],
  dataLoadStatus: DataStates.NEVER,
  dataLoadError: '',

  rules: [],
  categories: [],
  metaDataLoadStatus: DataStates.NEVER,
  metaDataLoadError: '',
}
// #endregion

// #region Reducers

// #region > Data
const getDataRequest: CaseReducer<DataStoreState, PayloadAction<void>> = (state) => {
  state.dataLoadStatus = state.dataLoadStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
  state.dataLoadError = null
}
interface PayloadGetDataSuccess {
  data: AccountData[]
}
const getDataSuccess: CaseReducer<DataStoreState, PayloadAction<PayloadGetDataSuccess>> = (state, action) => {
  state.data = action.payload.data
  state.dataLoadStatus = DataStates.SUCCESS
  state.dataLoadError = null
}
interface PayloadGetDataFailure {
  error: string
}
const getDataFailure: CaseReducer<DataStoreState, PayloadAction<PayloadGetDataFailure>> = (state, action) => {
  state.dataLoadStatus = DataStates.FAILURE
  state.dataLoadError = action.payload.error
}
// #endregion

// #region > Meta Data
const getMetaDataRequest: CaseReducer<DataStoreState, PayloadAction<void>> = (state) => {
  state.metaDataLoadStatus = state.metaDataLoadStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
  state.metaDataLoadError = null
}
interface PayloadGetMetaDataSuccess {
  meta: AccountMetaData
}
const getMetaDataSuccess: CaseReducer<DataStoreState, PayloadAction<PayloadGetMetaDataSuccess>> = (state, action) => {
  state.rules = action.payload.meta.rules
  state.categories = action.payload.meta.categories
  state.metaDataLoadStatus = DataStates.SUCCESS
  state.metaDataLoadError = null
}
interface PayloadGetMetaDataFailure {
  error: string
}
const getMetaDataFailure: CaseReducer<DataStoreState, PayloadAction<PayloadGetMetaDataFailure>> = (state, action) => {
  state.metaDataLoadStatus = DataStates.FAILURE
  state.metaDataLoadError = action.payload.error
}
interface PayloadAddRule {
  rule: AccountRule
}
const addRule: CaseReducer<DataStoreState, PayloadAction<PayloadAddRule>> = (state, action) => {
  state.rules = [
    ...state.rules,
    action.payload.rule
  ]
}
// #endregion

// #endregion

// #region Slice
export const DataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {
    getDataRequest,
    getDataSuccess,
    getDataFailure,

    getMetaDataRequest,
    getMetaDataSuccess,
    getMetaDataFailure,
    addRule,
  },
})
// #endregion
