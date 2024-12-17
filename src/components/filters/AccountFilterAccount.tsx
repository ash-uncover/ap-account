import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { AppSelectors } from '../../store/app/app.selectors'
import { AppSlice}  from '../../store/app/app.slice'
import { DataSelectors } from '../../store/data/data.selectors'
// CSS

export const AccountFilterAccount = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const data = useSelector(DataSelectors.data)
  const filterAccount = useSelector(AppSelectors.filterAccount)
  const [accounts, setAccounts] = useState<string[]>([])
  useEffect(() => {
    const newAccounts = data.reduce((acc: string[], d) => {
      if (!acc.includes(d.account)) {
        acc.push(d.account)
      }
      acc.sort((a1, a2) => a1.localeCompare(a2))
      return acc
    }, ['<all>'])
    setAccounts(newAccounts)
  }, [data])
  // #endregion

  // #region Events
  function handleFilterAccountChange(event: any) {
    dispatch(AppSlice.actions.setFilterAccount({ filter: event.target.value }))
  }
  // #endregion

  // #region Rendering
  return (
    <fieldset>
      <legend>Account</legend>
      <select
        name='account'
        value={filterAccount}
        onChange={handleFilterAccountChange}
      >
        {accounts.map(
          (acc) => (
            <option
              key={acc}
              value={acc === '<all>' ? '' : acc}
            >
              {acc}
            </option>
          )
        )}
      </select>
    </fieldset>
  )
  // #endregion
}
