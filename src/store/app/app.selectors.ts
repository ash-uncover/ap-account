import { RootState } from '../state'

export const base = (state: RootState) => state.app

export const data = (state: RootState) => base(state).data
export const filterRule = (state: RootState) => base(state).filterRule

const AppSelectors = {
  data,
  filterRule
}

export default AppSelectors
