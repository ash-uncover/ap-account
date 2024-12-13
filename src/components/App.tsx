import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataState, DataStates, DataStatesUtils } from '@uncover/js-utils'
//
import { Section } from './common/Section'
import { AccountFilters } from './filters/AccountFilters'
import { AccountRules } from './rules/AccountRules'
import { DialogCreateRule } from './rules/DialogCreateRule'
import { AccountTable } from './table/AccountTable'
import { AccountDataExt, AccountRule } from '../model/data'
import { loadData, loadLabels, loadRules } from '../service/DataService'
import AppSlice from '../store/app/app.slice'
import DataSelectors from '../store/data/data.selectors'
import { enrichData, extractLabels } from '../utils/RuleMatcher'
// CSS
import './App.css'

export const App = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const [status, setStatus] = useState<DataState>(DataStates.NEVER)
  const [addRuleFromData, setAddRuleFromData] = useState(null)

  const dataLoadStatus = useSelector(DataSelectors.dataLoadStatus)
  const dataLoadError = useSelector(DataSelectors.dataLoadError)

  const rulesLoadStatus = useSelector(DataSelectors.rulesLoadStatus)
  const rulesLoadError = useSelector(DataSelectors.rulesLoadError)

  const labelsLoadStatus = useSelector(DataSelectors.labelsLoadStatus)
  const labelsLoadError = useSelector(DataSelectors.labelsLoadError)

  const data = useSelector(DataSelectors.data)
  const rules = useSelector(DataSelectors.rules)

  useEffect(() => {
    const newStatus = DataStatesUtils.mergeDataStates([dataLoadStatus, rulesLoadStatus, labelsLoadStatus])
    setStatus(newStatus)
  }, [dataLoadStatus, rulesLoadStatus, labelsLoadStatus])
  
  useEffect(() => {
    if (status === DataStates.SUCCESS) {
      const dataExt = enrichData(data, rules).sort(
        (data1, data2) => new Date(data2.date).getTime() - new Date(data1.date).getTime()
      )
      dispatch(AppSlice.actions.setData({ data: dataExt }))

      const labels = extractLabels(rules)
      dispatch(AppSlice.actions.setLabels({ labels }))
    }
  }, [status, data, rules])

  useEffect(() => {
    loadData(dispatch)
    loadRules(dispatch)
    loadLabels(dispatch)
  }, [])
  // #endregion

  // #region Events
  function handleAddRuleFromData(data: AccountDataExt) {
    setAddRuleFromData(data)
  }
  function handleDialogCreateRuleFromDataCancel() {
    setAddRuleFromData(null)
  }
  function handleDialogCreateRuleFromDataCreate(rule: AccountRule) {
    console.log(rule)
    setAddRuleFromData(null)
  }
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
        <>
          <div className='app'>
            <header className='app-header'>
              HEAD
            </header>
            <main className='app-main'>
              <div className='app-content'>
                <Section className='app-content-filters'>
                  <AccountFilters />
                </Section>
                <Section className='app-content-table'>
                  <AccountTable 
                    onAddRule={handleAddRuleFromData}
                  />
                </Section>
              </div>
              <Section className='app-side'>
                <AccountRules />
              </Section>
            </main>
          </div>
          {addRuleFromData ?
            <DialogCreateRule 
              data={addRuleFromData}
              onCancel={handleDialogCreateRuleFromDataCancel}
              onCreate={handleDialogCreateRuleFromDataCreate}
            />
          : null}
        </>
      )
    }
  }
  // #region
}