import { RootState } from '../state'

export const base = (state: RootState) => state.data

export const data = (state: RootState) => base(state).data
export const dataLoadStatus = (state: RootState) => base(state).dataLoadStatus
export const dataLoadError = (state: RootState) => base(state).dataLoadError

export const rules = (state: RootState) => base(state).rules
export const categories = (state: RootState) => base(state).categories
export const metaDataLoadStatus = (state: RootState) => base(state).metaDataLoadStatus
export const metaDataLoadError = (state: RootState) => base(state).metaDataLoadError

export const DataSelectors = {
  data,
  dataLoadStatus,
  dataLoadError,

  rules,
  categories,
  metaDataLoadStatus,
  metaDataLoadError,
}
