import { AccountChecks, AccountMetaData } from '../model/data'
import { DataSlice } from '../store/data/data.slice'
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
            file,
            date,
            label1,
            label2,
            value
          ] = line
          const result = {
            account,
            file,
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

export const loadMetaData = async (dispatch: any) => {
  dispatch(DataSlice.actions.getMetaDataRequest())
  return fetch('/rules.json')
    .then((result) => {
      return result.json()
    })
    .then((meta: AccountMetaData) => {
      dispatch(DataSlice.actions.getMetaDataSuccess({ meta }))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.getMetaDataFailure({ error }))
    })
}

export const loadChecks = async (dispatch: any) => {
  dispatch(DataSlice.actions.getChecksRequest())
  return fetch('/checks.json')
    .then((result) => {
      return result.json()
    })
    .then((data: AccountChecks) => {
      dispatch(DataSlice.actions.getChecksSuccess(data))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.getChecksFailure({ error }))
    })
}
