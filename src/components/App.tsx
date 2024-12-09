import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataState, DataStates, DataStatesUtils } from '@uncover/js-utils'
import { AccountTable } from './table/AccountTable'
import DataSelectors from '../store/data/data.selectors'
import { loadData, loadLabels, loadRules } from '../service/DataService'
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

  useEffect(() => {
    const newStatus = DataStatesUtils.mergeDataStates([dataLoadStatus, rulesLoadStatus, labelsLoadStatus])
    console.log(dataLoadStatus, rulesLoadStatus, labelsLoadStatus)
    console.log(newStatus)
    setStatus(newStatus)
  }, [dataLoadStatus, rulesLoadStatus, labelsLoadStatus])

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