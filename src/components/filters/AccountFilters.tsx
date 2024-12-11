import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppSelectors from '../../store/app/app.selectors'
import AppSlice from '../../store/app/app.slice'
import { FilterCredit, FilterRule } from '../../store/app/app.state'
import { SegmentedButton } from '../common/SegmentedButton'
import { SegmentedButtonItem } from '../common/SegmentedButtonItem'
// CSS
import './AccountFilters.css'

export const AccountFilters = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const data = useSelector(AppSelectors.data)
  const filterRule = useSelector(AppSelectors.filterRule)
  const filterCredit = useSelector(AppSelectors.filterCredit)
  const filterSearch = useSelector(AppSelectors.filterSearch)
  // #endregion

  // #region Events
  function handleFilterRuleChange(itemKey: FilterRule) {
    dispatch(AppSlice.actions.setFilterRule({ filter: itemKey }))
  }
  function handleFilterCreditChange(itemKey: FilterCredit) {
    dispatch(AppSlice.actions.setFilterCredit({ filter: itemKey }))
  }
  function handleFilterSearchChange(event: any) {
    dispatch(AppSlice.actions.setFilterSearch({ filter: event.target.value }))
  }
  // #endregion

  // #region Rendering
  return (
    <div className='account-filters'>
      <div>FILTERS</div>
      
      <fieldset>
        <legend>Rules:</legend>
        <SegmentedButton
          className='account-filters--filter-rule'
          selectedKey={filterRule || ''}
          onChange={handleFilterRuleChange}
        >
          <SegmentedButtonItem 
            className='account-filters--filter-rule-item'
            itemKey='ALL'
          >
            {`ALL (${data.length})`}
          </SegmentedButtonItem>
          <SegmentedButtonItem 
            className='account-filters--filter-rule-item'
            itemKey='NONE'
          >
            {`NONE (${data.filter(d => d.categories.length === 0).length})`}
          </SegmentedButtonItem>
          {data.filter(d => d.categories.length > 2).length ?
            <SegmentedButtonItem 
              className='account-filters--filter-rule-item'
              itemKey='MORE'
            >
              {`2+ (${data.filter(d => d.categories.length > 2).length})`}
            </SegmentedButtonItem>
          : null}
        </SegmentedButton>
      </fieldset>

      <fieldset>
        <legend>Credits/Debits:</legend>
        <SegmentedButton
          className='account-filters--filter-credit'
          selectedKey={filterCredit || ''}
          onChange={handleFilterCreditChange}
        >
          <SegmentedButtonItem 
            className='account-filters--filter-credit-item'
            itemKey='ALL'
          >
            {`ALL (${data.length})`}
          </SegmentedButtonItem>
          <SegmentedButtonItem 
            className='account-filters--filter-credit-item'
            itemKey='CREDIT'
          >
            {`CREDIT (${data.filter(d => d.value > 0).length})`}
          </SegmentedButtonItem>
          <SegmentedButtonItem 
            className='account-filters--filter-credit-item'
            itemKey='DEBIT'
          >
            {`DEBIT (${data.filter(d => d.value <= 0).length})`}
          </SegmentedButtonItem>
        </SegmentedButton>
      </fieldset>

      <fieldset>
        <legend>Search</legend>
        <input value={filterSearch} onChange={handleFilterSearchChange} />
      </fieldset>
    </div>
  )
  // #endregion
}
