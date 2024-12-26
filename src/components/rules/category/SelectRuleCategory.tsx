import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
//
import { DataSelectors } from '../../../store/data/data.selectors'
// CSS

interface SelectRuleCategoryProperties {
  className?: string
  defaultText?: string
  category?: string
  onChange: (cat: string) => void
}
export const SelectRuleCategory = ({
  className,
  defaultText,
  category,
  onChange,
}: SelectRuleCategoryProperties) => {
  // #region Hooks
  const ref = useRef(null)
  const [classes, setClasses] = useState(['select-rule-category'])
  const categories = useSelector(DataSelectors.categories)
  // #endregion

  // #region Events
  function handleChange(event: any) {
    onChange(event.target.value)
  }
  // #endregion

  // #region Rendering
  return (
    <select
      className={[...classes, className].join(' ')}
      ref={ref}
      value={category || ''}
      onChange={handleChange}
    >
      <option value=''>
        {defaultText || '<all>'}
      </option>
      <optgroup label='Credit'>
        {categories
          .filter(cat => cat.credit)
          .toSorted((c1, c2) => c1.name.localeCompare(c2.name))
          .map((cat) => {
            return (
              <SelectRuleCategoryOptions
                category={cat}
                key={cat.name}
              />
            )
          })
        }
      </optgroup>
      <optgroup label='Debit'>
        {categories
          .filter(cat => !cat.credit)
          .toSorted((c1, c2) => c1.name.localeCompare(c2.name))
          .map((cat) => {
            return (
              <SelectRuleCategoryOptions
                category={cat}
                key={cat.name}
              />
            )
          })
        }
      </optgroup>
    </select >
  )
  // #endregion
}

interface SelectRuleCategoryOptionsProperties {
  category?: any
}
export const SelectRuleCategoryOptions = ({
  category,
}: SelectRuleCategoryOptionsProperties) => {
  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  return (
    <>
      <option
        value={category.name}
        style={{
          color: category.color,
          background: category.bgcolor
        }}
      >
        {category.name}
      </option>
      {category.categories.toSorted((c1, c2) => c1.localeCompare(c2)).map(
        (label: string) => (
          <option
            key={`${category.name}/${label}`}
            value={`${category.name}/${label}`}
            style={{
              color: category.color,
              background: category.bgcolor
            }}
          >
            {`${category.name}/${label}`}
          </option>
        )
      )}
    </>
  )
  // #endregion
}

