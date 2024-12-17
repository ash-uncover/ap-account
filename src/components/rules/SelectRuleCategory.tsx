import React, { useState } from 'react'
import { useSelector } from 'react-redux'
//
import { DataSelectors } from '../../store/data/data.selectors'
// CSS

interface SelectRuleCategoryProperties {
  className?: string
  category?: string
  onChange: (cat: string) => void
}
export const SelectRuleCategory = ({
  className,
  category,
  onChange,
}: SelectRuleCategoryProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-rule-category'])
  const categories = useSelector(DataSelectors.categories)
  // #endregion

  console.log(categories)
  // #region Events
  function handleChange(event: any) {
    onChange(event.target.value)
  }
  // #endregion

  // #region Rendering
  return (
    <select
      className={[...classes, className].join(' ')}
      value={category}
      onChange={handleChange}
    >
    </select>
  )
  // #endregion
}