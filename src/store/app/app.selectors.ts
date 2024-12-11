import { RootState } from '../state'

export const base = (state: RootState) => state.app

export const data = (state: RootState) => base(state).data

const AppSelectors = {
  data
}

export default AppSelectors
