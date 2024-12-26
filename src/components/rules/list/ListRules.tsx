import React from 'react'
//
import { Category } from '../../../model/data'
import { ListItemRules } from './ListItemRules'
// CSS
import './AccountRules.css'

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
            <ListItemRules
              category={cat}
            />
            {cat.categories.toSorted((c1, c2) => c1.localeCompare(c2)).map(
              (label) => (
                <ListItemRules
                  key={`${cat.name}/${label}`}
                  category={cat}
                  label={label}
                />
              )
            )}
          </div>
        )
      )}
    </ul>
  )
  // #endregion
}