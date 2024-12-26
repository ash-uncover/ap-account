import React, { useState } from 'react'
import { useSelector } from 'react-redux'
//
import { Category } from '../../../model/data'
import { DataSelectors } from '../../../store/data/data.selectors'
import { Tag } from '../../common/Tag'
// CSS
import './ListItemRules.css'

interface ListItemRulesProperties {
  category: Category
  label?: string
}
export const ListItemRules = ({
  category,
  label
}: ListItemRulesProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['list-item-rules'])
  const rules = useSelector(DataSelectors.rules)
  // #endregion

  // #region Rendering
  const categoryLabel = label ? `${category.name}/${label}` : `${category.name}`
  return (
    <li className={classes.join(' ')}>
      <Tag 
        className='list-item-rules_tag'
        color={category.color} 
        background={category.bgcolor}
      >
        {categoryLabel}
      </Tag>
      <span
        className='list-item-rules_number'
      >
        ({rules.filter(r => r.category === categoryLabel).length})
      </span>
    </li>
  )
  // #endregion
}