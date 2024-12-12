import React, { useCallback, useEffect, useState } from 'react'
//
import { toggleClass } from '../../utils/ClassHelper'
import { OPERATORS, SelectOperator } from './SelectOperator'
// CSS

export interface SelectLabelState {
  activated: boolean
  operator: string
  value: string
}
interface SelectRuleLabelProperties {
  className?: string
  disabled?: boolean
  label: string
  onChange: (state: SelectLabelState) => void
}
export const SelectRuleLabel = ({
  className,
  disabled,
  label,
  onChange,
}: SelectRuleLabelProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-rule-label'])
  
  const [activated, setActivated] = useState<boolean>(false)
  const [operator, setOperator] = useState<string>('')
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'select-rule-label--disabled', disabled))
  }, [disabled])
  
  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'select-rule-label--activated', activated))
  }, [activated])

  // #endregion

  // #region Events
  const handleCheckboxActivateChange = useCallback((event: any) => {
    setActivated(event.target.checked)
    onChange({
      activated: event.target.checked,
      operator,
      value
    })
  }, [operator, value])
  const handleOperatorChange = useCallback((operator: string) => {
    setOperator(operator)
    onChange({
      activated,
      operator,
      value
    })
  }, [activated, value])
  const handleValueChange = useCallback((event: any) => {
    setValue(event.target.value)
    onChange({
      activated,
      operator,
      value: event.target.value
    })
  }, [activated, operator])
  // #endregion

  // #region Rendering
  return (
    <div className={[...classes, className].join(' ')}>
      <input 
        type='checkbox' 
        checked={activated} 
        disabled={disabled}
        onChange={handleCheckboxActivateChange}
      />
      
      <span>{label}</span>
      
      <SelectOperator 
        disabled={!activated || disabled}
        name='operator-label'
        operator={operator}
        operators={Object.values(OPERATORS)}
        onChange={handleOperatorChange}
      />
      
      <input 
        disabled={!activated || disabled}
        value={value}
        onChange={handleValueChange} 
      />
    </div>
  )
  // #endregion
}