import React from 'react'
import { useSelector } from 'react-redux'
//
import AppSelectors from '../../store/app/app.selectors'
// CSS
import './AccountRules.css'

export const AccountRules = () => {
  // #region Hooks
  const labels = useSelector(AppSelectors.labels)
  // #endregion
  // #region Rendering
  return (
    <div className='account-rules'>
      <div>RULES</div>
      <ul>
        <li>
          Credit
          <ul>
            {Object.keys(labels.credit).map(
              (key) => {
                return (
                  <li key={key}>
                    {key}
                    <ul>
                      {labels.credit[key].map(
                        (label) => <li key={`${key}-${label}`}>{label}</li>
                      )}
                    </ul>
                  </li>
                )
              }
            )}
          </ul>
        </li>
        <li>
          Debit
          <ul>
            {Object.keys(labels.debit).map(
              (key) => {
                return (
                  <li key={key}>
                    {key}
                    <ul>
                      {labels.debit[key].map(
                        (label) => <li key={`${key}-${label}`}>{label}</li>
                      )}
                    </ul>
                  </li>
                )
              }
            )}
          </ul>
        </li>
      </ul>
    </div>
  )
  // #endregion
}
