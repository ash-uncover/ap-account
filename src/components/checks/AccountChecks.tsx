import React from 'react'
import { useSelector } from 'react-redux'
//
import { DataSelectors } from '../../store/data/data.selectors'
// CSS
import './AccountChecks.css'

export const AccountChecks = () => {
  // #region Hooks
  const checks = useSelector(DataSelectors.checks)
  // #endregion

  // #region Rendering
  return (
    <div className='account-checks'>
      <div>CHECKS</div>
      <ul className='account-rules--list'>
        {checks.map(
          (check) => {
            return (
              <li key={check.id}>
                <div>{check.id}</div>
                <div>{check.debit} - {check.credit}</div>
              </li>
            )
          }
        )}
      </ul>
    </div>
  )
  // #endregion
}
