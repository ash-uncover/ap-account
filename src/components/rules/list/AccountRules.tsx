import React from 'react'
import { useSelector } from 'react-redux'
//
import { Category } from '../../../model/data'
import { DataSelectors } from '../../../store/data/data.selectors'
// CSS
import './AccountRules.css'
import { Tag } from '../../common/Tag'
import { ListRules } from './ListRules'

export const AccountRules = () => {
  // #region Hooks
  const categories = useSelector(DataSelectors.categories)
  // #endregion

  // #region Rendering
  return (
    <div className='account-rules'>
      <div>RULES</div>
      <ul className='account-rules--list-top'>
        <li>
          Credit
          <ListRules
            categories={categories.filter(cat => cat.credit)}
          />
        </li>
        <li>
          Debit
          <ListRules
            categories={categories.filter(cat => !cat.credit)}
          />
        </li>
      </ul>
    </div>
  )
  // #endregion
}
