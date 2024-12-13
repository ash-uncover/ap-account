import React, { useEffect, useState } from 'react'
import { Operator } from '../../model/operators'
// CSS

export interface SelectOperatorProperties {
  className?: string
  disabled?: boolean
  name: string
  operator?: string
  operators: Operator[]
  onChange: (operator: string) => void
}
export const SelectOperator = ({
  className,
  disabled,
  name,
  operator,
  operators,
  onChange,
}: SelectOperatorProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-operator'])
  useEffect(() => {
    if (!operator && operators.length) {
      onChange(operators[0].key)
    }
  }, [operator, operators])
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
        name={name}
        disabled={disabled}
        value={operator}
        onChange={handleChange}
      >
        {operators.map(
          (op) => (
            <option
              key={op.key}
              value={op.key}
            >
              {op.text}
            </option>
          )
        )}
      </select>
  )
  // #endregion
}