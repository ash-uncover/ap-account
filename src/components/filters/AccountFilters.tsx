import React from 'react'
//
import { AccountFilterAccount } from './AccountFilterAccount'
import { AccountFilterCredit } from './AccountFilterCredit'
import { AccountFilterFile } from './AccountFilterFile'
import { AccountFilterRule } from './AccountFilterRule'
import { AccountFilterSearch } from './AccountFilterSearch'
// CSS
import './AccountFilters.css'
import { AccountFilterCategory } from './AccountFilterCategory'

export const AccountFilters = () => {
  // #region Rendering
  return (
    <div className='account-filters'>
      <div>FILTERS</div>
      <div className='account-filters-controls'>
        <AccountFilterSearch />
        <AccountFilterAccount />
        <AccountFilterFile />
        <div style={{margin: 'auto'}} />
        <AccountFilterCategory />
        <AccountFilterRule />
        <AccountFilterCredit />
      </div>
    </div>
  )
  // #endregion
}
