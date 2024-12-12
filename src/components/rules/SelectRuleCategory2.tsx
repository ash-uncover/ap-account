import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//
import AppSelectors from '../../store/app/app.selectors'
// CSS

interface SelectRuleCategory2Properties {
  className?: string
  category?: string
  onChange: (cat: string) => void
}
export const SelectRuleCategory2 = ({
  className,
  category,
  onChange,
}: SelectRuleCategory2Properties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-rule-category-2'])

  const labels = useSelector(AppSelectors.labels)
  const [categories2, setCategories2] = useState<string[]>([])
  useEffect(() => {
    const newCategories2 = []
    Object.keys(labels.credit).forEach((key: string) => {
      labels.credit[key].forEach((value) => {
        if (!newCategories2.includes(value)) {
          newCategories2.push(value)
        }
      })
    })
    Object.keys(labels.debit).forEach((key: string) => {
      labels.credit[key].forEach((value) => {
        if (!newCategories2.includes(value)) {
          newCategories2.push(value)
        }
      })
    })
    setCategories2(newCategories2)
  }, [labels])
  // #endregion

  // #region Events
  function handleChange(event: any) {
    onChange(event.target.value)
  }
  // #endregion

  // #region Rendering
  return (
    <div className={[...classes, className].join(' ')}>
      <label>Category 2</label>
      <input 
        list='categories2' 
        value={category}
        onChange={handleChange}
      />
      <datalist id='categories2'>
        {categories2.map((c) => <option key={c} value={c}>{c}</option>)}
      </datalist>
    </div>
  )
  // #endregion
}