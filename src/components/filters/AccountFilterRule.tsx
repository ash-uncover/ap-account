import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppSelectors } from '../../store/app/app.selectors'
import AppSlice from '../../store/app/app.slice'
import { FilterRule } from '../../store/app/app.state'
import { SegmentedButton } from '../common/SegmentedButton'
import { SegmentedButtonItem } from '../common/SegmentedButtonItem'
// CSS

export const AccountFilterRule = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const data = useSelector(AppSelectors.data)
  const filterRule = useSelector(AppSelectors.filterRule)
  // #endregion

  // #region Events
  function handleFilterRuleChange(itemKey: FilterRule) {
    dispatch(AppSlice.actions.setFilterRule({ filter: itemKey }))
  }
  // #endregion

  // #region Rendering
  return (
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
        <SegmentedButtonItem
          className='account-filters--filter-rule-item'
          itemKey='MORE'
        >
          {`2+ (${data.filter(d => d.categories.length > 1).length})`}
        </SegmentedButtonItem>
      </SegmentedButton>
    </fieldset>
  )
  // #endregion
}
