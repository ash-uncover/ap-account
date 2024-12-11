import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataState, DataStates, DataStatesUtils } from '@uncover/js-utils'
import { AccountTable } from './table/AccountTable'
import AppSlice from '../store/app/app.slice'
import DataSelectors from '../store/data/data.selectors'
import { loadData, loadLabels, loadRules } from '../service/DataService'
import { enrichData } from '../utils/RuleMatcher'
// CSS
import './App.css'

export const App = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const [status, setStatus] = useState<DataState>(DataStates.NEVER)

  const dataLoadStatus = useSelector(DataSelectors.dataLoadStatus)
  const dataLoadError = useSelector(DataSelectors.dataLoadError)

  const rulesLoadStatus = useSelector(DataSelectors.rulesLoadStatus)
  const rulesLoadError = useSelector(DataSelectors.rulesLoadError)

  const labelsLoadStatus = useSelector(DataSelectors.labelsLoadStatus)
  const labelsLoadError = useSelector(DataSelectors.labelsLoadError)

  const data = useSelector(DataSelectors.data)
  const rules = useSelector(DataSelectors.rules)
  const labels = useSelector(DataSelectors.labels)

  useEffect(() => {
    const newStatus = DataStatesUtils.mergeDataStates([dataLoadStatus, rulesLoadStatus, labelsLoadStatus])
    setStatus(newStatus)
  }, [dataLoadStatus, rulesLoadStatus, labelsLoadStatus])
  
  useEffect(() => {
    if (status === DataStates.SUCCESS) {
      const dataExt = enrichData(data, rules)
      dispatch(AppSlice.actions.setData({ data: dataExt }))
    }
  }, [status, data, rules])

  useEffect(() => {
    loadData(dispatch)
    loadRules(dispatch)
    loadLabels(dispatch)
  }, [])
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  switch (status) {
    case DataStates.NEVER: 
    case DataStates.FETCHING: 
    case DataStates.FETCHING_FIRST: 
    case DataStates.OUTDATED: {
      return (
        <div className='app'>
          loading
        </div>
      )
    }
    case DataStates.FAILURE: {
      return (
        <div className='app'>
          error
          <div>data: {dataLoadError}</div>
          <div>rules: {rulesLoadError}</div>
          <div>labels: {labelsLoadError}</div>
        </div>
      )
    }
    case DataStates.SUCCESS: {
      return (
        <div className='app'>
          <header></header>
          <main>
            <AccountTable />
          </main>
        </div>
      )
    }
  }
  // #region
}