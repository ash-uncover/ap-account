import { RootState } from '../state'

export const base = (state: RootState) => state.app

export const data = (state: RootState) => base(state).data
export const labels = (state: RootState) => base(state).labels

export const filterRule = (state: RootState) => base(state).filterRule
export const filterCredit = (state: RootState) => base(state).filterCredit
export const filterSearch = (state: RootState) => base(state).filterSearch

const AppSelectors = {
  data,
  labels,

  filterRule,
  filterCredit,
  filterSearch,
}

export default AppSelectors
