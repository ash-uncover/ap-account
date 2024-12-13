import React, { useCallback, useEffect, useState } from 'react'
//
import { toggleClass } from '../../../utils/ClassHelper'
import { SelectOperator } from '../SelectOperator'
import { OperatorKey, OPERATORS } from '../../../model/operators'
// CSS

export interface SelectLabelState {
  operator: OperatorKey
  value: string
}
interface SelectRuleLabelProperties {
  className?: string
  disabled?: boolean
  field: string
  onChange: (state: SelectLabelState) => void
}
export const SelectRuleLabel = ({
  className,
  disabled,
  field,
  onChange
}: SelectRuleLabelProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-rule-label'])

  const [operator, setOperator] = useState<OperatorKey>()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'select-rule-label--disabled', disabled))
  }, [disabled])
  // #endregion

  // #region Events
  const handleOperatorChange = useCallback((op: OperatorKey) => {
    setOperator(op)
    onChange({
      operator: op,
      value
    })
  }, [value])
  const handleValueChange = useCallback((event: any) => {
    setValue(event.target.value)
    onChange({
      operator,
      value: event.target.value
    })
  }, [operator])
  // #endregion

  // #region Rendering
  return (
    <span className={[...classes, className].join(' ')}>
      <SelectOperator
        disabled={disabled}
        name='operator-label'
        operator={operator}
        operators={Object.values(OPERATORS)}
        onChange={handleOperatorChange}
      />

      <input
        disabled={disabled}
        value={value}
        onChange={handleValueChange}
      />
    </span>
  )
  // #endregion
}