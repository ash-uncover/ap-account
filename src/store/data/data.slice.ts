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
  AccountCategory, 
  AccountRule
} from '../../model/data'

// #region State
const initialState: DataStoreState = {
  data: [],
  dataLoadStatus: DataStates.NEVER,
  dataLoadError: '',

  rules: [],
  rulesLoadStatus: DataStates.NEVER,
  rulesLoadError: '',

  labels: [],
  labelsLoadStatus: DataStates.NEVER,
  labelsLoadError: '',
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

// #region > Rules
const getRulesRequest: CaseReducer<DataStoreState, PayloadAction<void>> = (state) => {
  state.rulesLoadStatus = state.rulesLoadStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
  state.rulesLoadError = null
}
interface PayloadGetRulesSuccess {
  rules: AccountRule[]
}
const getRulesSuccess: CaseReducer<DataStoreState, PayloadAction<PayloadGetRulesSuccess>> = (state, action) => {
  state.rules = action.payload.rules
  state.rulesLoadStatus = DataStates.SUCCESS
  state.rulesLoadError = null
}
interface PayloadGetRulesFailure {
  error: string
}
const getRulesFailure: CaseReducer<DataStoreState, PayloadAction<PayloadGetRulesFailure>> = (state, action) => {
  state.rulesLoadStatus = DataStates.FAILURE
  state.rulesLoadError = action.payload.error
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

// #region > Labels
const getLabelsRequest: CaseReducer<DataStoreState, PayloadAction<void>> = (state) => {
  state.labelsLoadStatus = state.labelsLoadStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
  state.labelsLoadError = null
}
interface PayloadGetLabelsSuccess {
  labels: AccountCategory[]
}
const getLabelsSuccess: CaseReducer<DataStoreState, PayloadAction<PayloadGetLabelsSuccess>> = (state, action) => {
  state.labels = action.payload.labels
  state.labelsLoadStatus = DataStates.SUCCESS
  state.labelsLoadError = null
}
interface PayloadGetLabelsFailure {
  error: string
}
const getLabelsFailure: CaseReducer<DataStoreState, PayloadAction<PayloadGetLabelsFailure>> = (state, action) => {
  state.labelsLoadStatus = DataStates.FAILURE
  state.labelsLoadError = action.payload.error
}
// #endregion

// #endregion

// #region Slice
const DataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {
    getDataRequest,
    getDataSuccess,
    getDataFailure,

    getRulesRequest,
    getRulesSuccess,
    getRulesFailure,
    addRule,

    getLabelsRequest,
    getLabelsSuccess,
    getLabelsFailure,
  },
})
// #endregion

export default DataSlice
