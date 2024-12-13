import { RootState } from '../state'

export const base = (state: RootState) => state.data

export const data = (state: RootState) => base(state).data
export const dataLoadStatus = (state: RootState) => base(state).dataLoadStatus
export const dataLoadError = (state: RootState) => base(state).dataLoadError

export const rules = (state: RootState) => base(state).rules
export const rulesLoadStatus = (state: RootState) => base(state).rulesLoadStatus
export const rulesLoadError = (state: RootState) => base(state).rulesLoadError

export const labels = (state: RootState) => base(state).labels
export const labelsLoadStatus = (state: RootState) => base(state).labelsLoadStatus
export const labelsLoadError = (state: RootState) => base(state).labelsLoadError

export const DataSelectors = {
  data,
  dataLoadStatus,
  dataLoadError,

  rules,
  rulesLoadStatus,
  rulesLoadError,

  labels,
  labelsLoadStatus,
  labelsLoadError,
}
