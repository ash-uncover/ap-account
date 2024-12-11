import React from 'react'
//
import { AccountFiltersSearch } from './AccountFilterSearch'
import { AccountFilterCredit } from './AccountFilterCredit'
import { AccountFilterRule } from './AccountFilterRule'
// CSS
import './AccountFilters.css'

export const AccountFilters = () => {
  // #region Rendering
  return (
    <div className='account-filters'>
      <div>FILTERS</div>
      
      <AccountFilterRule />
      <AccountFilterCredit />
      <AccountFiltersSearch />
    </div>
  )
  // #endregion
}
