import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataState, DataStates, DataStatesUtils, DownloadUtils } from '@uncover/js-utils'
//
import { Section } from './common/Section'
import { AccountFilters } from './filters/AccountFilters'
import { AccountRules } from './rules/list/AccountRules'
import { DialogCreateRule } from './rules/DialogCreateRule'
import { AccountTable } from './table/AccountTable'
import { AccountDataExt, AccountRule } from '../model/data'
import { loadChecks, loadData, loadMetaData } from '../service/DataService'
import { AppSelectors } from '../store/app/app.selectors'
import { AppSlice } from '../store/app/app.slice'
import { DataSelectors } from '../store/data/data.selectors'
import { DataSlice } from '../store/data/data.slice'
import { enrichData, extractLabels } from '../utils/RuleMatcher'
// CSS
import './App.css'
import { AccountChecks } from './checks/AccountChecks'

export const App = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const [status, setStatus] = useState<DataState>(DataStates.NEVER)
  const [addRuleFromData, setAddRuleFromData] = useState(null)

  const dataLoadStatus = useSelector(DataSelectors.dataLoadStatus)
  const dataLoadError = useSelector(DataSelectors.dataLoadError)

  const metaDataLoadStatus = useSelector(DataSelectors.metaDataLoadStatus)
  const metaDataLoadError = useSelector(DataSelectors.metaDataLoadError)

  const checksLoadStatus = useSelector(DataSelectors.checksLoadStatus)
  const checksLoadError = useSelector(DataSelectors.checksLoadError)

  const data = useSelector(DataSelectors.data)
  const rules = useSelector(DataSelectors.rules)
  const categories = useSelector(DataSelectors.categories)

  useEffect(() => {
    const newStatus = DataStatesUtils.mergeDataStates([dataLoadStatus, metaDataLoadStatus, checksLoadStatus])
    setStatus(newStatus)
  }, [dataLoadStatus, metaDataLoadStatus, checksLoadStatus])

  useEffect(() => {
    if (status === DataStates.SUCCESS) {
      const dataExt = enrichData(data, rules, categories).sort(
        (data1, data2) => new Date(data2.date).getTime() - new Date(data1.date).getTime()
      )
      dispatch(AppSlice.actions.setData({ data: dataExt }))

      const labels = extractLabels(categories)
      dispatch(AppSlice.actions.setLabels({ labels }))
    }
  }, [status, data, rules])

  useEffect(() => {
    loadData(dispatch)
    loadMetaData(dispatch)
    loadChecks(dispatch)
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
    dispatch(DataSlice.actions.addRule({ rule }))
    setAddRuleFromData(null)
  }
  function handleExportRulesClick() {
    DownloadUtils.downloadJson('rules.json', {
      categories,
      rules
    })
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
          <div>meta: {metaDataLoadError}</div>
          <div>checks: {checksLoadError}</div>
        </div>
      )
    }
    case DataStates.SUCCESS: {
      return (
        <>
          <div className='app'>
            <header className='app-header'>
              <div style={{marginInlineEnd: 'auto '}}>
                Accounts
              </div>
              <button onClick={handleExportRulesClick}>Export Rules</button>
            </header>
            <main className='app-main'>
              <Section className='app-side'>
                <AccountChecks />
              </Section>
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