import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { AppSelectors } from '../../store/app/app.selectors'
import AppSlice from '../../store/app/app.slice'
import { FilterCredit } from '../../store/app/app.state'
import { SegmentedButton } from '../common/SegmentedButton'
import { SegmentedButtonItem } from '../common/SegmentedButtonItem'
// CSS

export const AccountFilterCredit = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const data = useSelector(AppSelectors.data)
  const filterCredit = useSelector(AppSelectors.filterCredit)
  // #endregion

  // #region Events
  function handleFilterCreditChange(itemKey: FilterCredit) {
    dispatch(AppSlice.actions.setFilterCredit({ filter: itemKey }))
  }
  // #endregion

  // #region Rendering
  return (
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
  )
  // #endregion
}
