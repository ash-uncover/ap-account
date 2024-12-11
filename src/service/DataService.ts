import { AccountCategory, AccountRule } from '../model/data'
import DataSlice from '../store/data/data.slice'
import { read } from '../utils/CSVReader'

export const loadData = async (dispatch: any) => {
  dispatch(DataSlice.actions.getDataRequest())
  return fetch('/data.csv')
    .then((result) => {
      return result.text()
    })
    .then((text: string) => {
      const textData = read(text.split('\n'))
      textData.shift()
      const jsonData = textData.map(
        (line) => {
          const [
            account,
            date,
            label1,
            label2,
            value
          ] = line
          const result = {
            account,
            date,
            label1,
            label2,
            value
          }
          return result
        }
      )
      dispatch(DataSlice.actions.getDataSuccess({ data: jsonData }))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.getDataFailure({ error }))
    })
}

export const loadRules = async (dispatch: any) => {
  dispatch(DataSlice.actions.getRulesRequest())
  return fetch('/rules.json')
    .then((result) => {
      return result.json()
    })
    .then((rules: AccountRule[]) => {
      dispatch(DataSlice.actions.getRulesSuccess({ rules }))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.getRulesFailure({ error }))
    })
}

export const loadLabels = async (dispatch: any) => {
  dispatch(DataSlice.actions.getLabelsRequest())
  return fetch('/labels.json')
    .then((result) => {
      return result.json()
    })
    .then((labels: AccountCategory[]) => {
      dispatch(DataSlice.actions.getLabelsSuccess({ labels }))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.getLabelsFailure({ error }))
    })
}
