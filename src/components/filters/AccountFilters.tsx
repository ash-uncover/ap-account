import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppSelectors from '../../store/app/app.selectors'
import DataSelectors from '../../store/data/data.selectors'
import { AccountData, AccountDataExt } from '../../model/data'
import { addClass, removeClass, toggleClass } from '../../utils/ClassHelper'
// CSS
import './AccountFilters.css'
import AppSlice from 'src/store/app/app.slice'

export const AccountFilters = () => {
  // #region Hooks
  const dispatch = useDispatch()
  // #endregion

  // #region Events
  function handleButtonRulesAllClick() {
    dispatch(AppSlice.actions.setFilterRule({ filter: 'ALL' }))
  }
  function handleButtonRulesNoneClick() {
    dispatch(AppSlice.actions.setFilterRule({ filter: 'NONE' })) 
  }
  function handleButtonRulesMoreClick() {
    dispatch(AppSlice.actions.setFilterRule({ filter: 'MORE' }))
  }
  // #endregion

  // #region Rendering
  return (
    <div className='account-filters'>
      FILTERS
      <div>
        <button 
          className={}          
          onClick={handleButtonRulesAllClick}>ALL</button>
        <button onClick={handleButtonRulesNoneClick}>NONE</button>
        <button onClick={handleButtonRulesMoreClick}>2+</button>
      </div>
    </div>
  )
  // #endregion
}