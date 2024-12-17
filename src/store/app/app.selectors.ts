import { RootState } from '../state'

export const base = (state: RootState) => state.app

export const data = (state: RootState) => base(state).data

export const filterRule = (state: RootState) => base(state).filterRule
export const filterCredit = (state: RootState) => base(state).filterCredit
export const filterSearch = (state: RootState) => base(state).filterSearch
export const filterAccount = (state: RootState) => base(state).filterAccount
export const filterFile = (state: RootState) => base(state).filterFile
export const filterCategory = (state: RootState) => base(state).filterCategory

export const AppSelectors = {
  data,

  filterRule,
  filterCredit,
  filterSearch,
  filterAccount,
  filterFile,
  filterCategory, 
}
