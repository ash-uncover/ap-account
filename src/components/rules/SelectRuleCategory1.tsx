import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//
import AppSelectors from '../../store/app/app.selectors'
// CSS

interface SelectRuleCategory1Properties {
  className?: string
  category?: string
  onChange: (cat: string) => void
}
export const SelectRuleCategory1 = ({
  className,
  category,
  onChange,
}: SelectRuleCategory1Properties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-rule-category-1'])
  const labels = useSelector(AppSelectors.labels)
  const [categories1, setCategories1] = useState<string[]>([])
  useEffect(() => {
    const newCategories1 = []
    Object.keys(labels.credit).forEach((key: string) => {
      if (!newCategories1.includes(key)) {
        newCategories1.push(key)
      }
    })
    Object.keys(labels.debit).forEach((key: string) => {
      if (!newCategories1.includes(key)) {
        newCategories1.push(key)
      }
    })
    setCategories1(newCategories1)
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
      <label>Category 1</label>
      <input 
        list='categories1' 
        value={category}
        onChange={handleChange}
      />
      <datalist id='categories1'>
        {categories1.map((c) => <option key={c} value={c}>{c}</option>)}
      </datalist>
    </div>
  )
  // #endregion
}