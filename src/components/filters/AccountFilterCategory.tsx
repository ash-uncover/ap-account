import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppSelectors } from '../../store/app/app.selectors'
import { AppSlice } from '../../store/app/app.slice'
import { DataSelectors } from '../../store/data/data.selectors'
import { SelectRuleCategory } from '../rules/category/SelectRuleCategory'
// CSS

export const AccountFilterCategory = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const categories = useSelector(DataSelectors.categories)
  const filterCategory = useSelector(AppSelectors.filterCategory)
  // #endregion

  // #region Events
  function handleFilterCategoryChange(event: any) {
    dispatch(AppSlice.actions.setFilterCategory({ filter: event }))
  }
  // #endregion

  // #region Rendering
  return (
    <fieldset>
      <legend>Category</legend>
      <SelectRuleCategory
        category={filterCategory}
        onChange={handleFilterCategoryChange}
      />
    </fieldset>
  )
  // #endregion
}
