import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import AppSelectors from '../../store/app/app.selectors'
import AppSlice from '../../store/app/app.slice'
// CSS

export const AccountFilterSearch = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const filterSearch = useSelector(AppSelectors.filterSearch)
  // #endregion

  // #region Events
  function handleFilterSearchChange(event: any) {
    dispatch(AppSlice.actions.setFilterSearch({ filter: event.target.value }))
  }
  // #endregion

  // #region Rendering
  return (
    <fieldset>
      <legend>Search</legend>
      <input 
        value={filterSearch} 
        onChange={handleFilterSearchChange} 
      />
    </fieldset>
  )
  // #endregion
}
