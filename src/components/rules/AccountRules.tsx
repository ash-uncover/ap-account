import React from 'react'
import { useSelector } from 'react-redux'
//
import { Category } from '../../model/data'
import { DataSelectors } from '../../store/data/data.selectors'
// CSS
import './AccountRules.css'
import { Tag } from '../common/Tag'

export const AccountRules = () => {
  // #region Hooks
  const categories = useSelector(DataSelectors.categories)
  // #endregion
  // #region Rendering
  return (
    <div className='account-rules'>
      <div>RULES</div>
      <ul>
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

interface ListRulesProperties {
  categories: Category[]
}
export const ListRules = ({
  categories
}: ListRulesProperties) => {
  // #region Rendering
  return (
    <ul>
      {categories.toSorted((c1, c2) => c1.name.localeCompare(c2.name)).map(
        (cat) => (
          <div key={`${cat.name}`}>
            <li>
              <Tag color={cat.color} background={cat.bgcolor}>
                {cat.name}
              </Tag>
            </li>
            {cat.categories.toSorted((c1, c2) => c1.localeCompare(c2)).map(
              (label) => (
                <li key={`${label}`}>
                  <Tag color={cat.color} background={cat.bgcolor}>
                    {`${cat.name}/${label}`} - {label}
                  </Tag>
                </li>
              )
            )}
          </div>
        )
      )}
    </ul>
  )
  // #endregion
}