import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppStoreState
} from './app.state'

// #region State
const initialState: AppStoreState = {
}
// #endregion

// #region Reducers
// #endregion

// #region Slice
const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {

  },
})
// #endregion

export default AppSlice
