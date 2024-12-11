import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppStoreState
} from './app.state'
import { AccountDataExt } from 'src/model/data'

// #region State
const initialState: AppStoreState = {
  data: [],
}
// #endregion

// #region Reducers
export interface PayloadSetData {
  data: AccountDataExt[]
}
const setData: CaseReducer<AppStoreState, PayloadAction<PayloadSetData>> = (state, action) => {
  state.data = action.payload.data
}

// #endregion

// #region Slice
const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setData
  },
})
// #endregion

export default AppSlice
