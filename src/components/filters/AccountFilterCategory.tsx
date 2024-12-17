import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppSelectors } from '../../store/app/app.selectors'
import { AppSlice } from '../../store/app/app.slice'
import { DataSelectors } from '../../store/data/data.selectors'
// CSS

export const AccountFilterCategory = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const categories = useSelector(DataSelectors.categories)
  const filterCategory = useSelector(AppSelectors.filterCategory)
  // #endregion

  // #region Events
  function handleFilterCategoryChange(event: any) {
    dispatch(AppSlice.actions.setFilterCategory({ filter: event.target.value }))
  }
  // #endregion

  // #region Rendering
  return (
    <fieldset>
      <legend>Category</legend>
      <select
        name='category'
        value={filterCategory}
        onChange={handleFilterCategoryChange}
      >
        <option
          value=''
        >
          {'<all>'}
        </option>
        {categories.map(
          (c) => <AccountFilterCategoryOptions key={c.name} category={c} />
        )}
      </select>
    </fieldset>
  )
  // #endregion
}

export const AccountFilterCategoryOptions = ({
  category
}) => {
  return (
    <>
      <option
        value={category.name}
      >
        {category.name}
      </option>
      {category.categories.map(
        (c: string) => (
          <option
            key={`${category.name}/${c}`}
            value={`${category.name}/${c}`}
          >
            {`${category.name}/${c}`}
          </option>
        )
      )}
    </>
  )
}