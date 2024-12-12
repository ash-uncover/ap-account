import React, { useEffect, useState } from 'react'
// CSS

export interface Operator {
  key: string
  text: string
}
export const OPERATORS: {
  EQUAL: Operator
  NOT_EQUAL: Operator
  STARTSWITH: Operator
  NOT_STARTSWITH: Operator
  INCLUDES: Operator
  NOT_INCLUDES: Operator
} = {
  EQUAL: { key: 'equal', text: 'equal' },
  NOT_EQUAL: { key: 'notequal', text: 'not equal' },
  STARTSWITH: { key: 'startswith', text: 'startswith' },
  NOT_STARTSWITH: { key: 'notstartswith', text: 'not startswith' },
  INCLUDES: { key: 'includes', text: 'includes' },
  NOT_INCLUDES: { key: 'notincludes', text: 'includes' },
}

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