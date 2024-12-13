import React, { useState } from 'react'
//
import { AccountField, Rule } from '../../../model/data'
import { SelectLabelState, SelectRuleLabel } from './SelectRuleLabel'
// CSS

interface RuleBuilderLabelProperties {
  className?: string
  field: AccountField
  fieldLabel: string
  onChange: (rule: Rule) => void
}
export const RuleBuilderLabel = ({
  className,
  field,
  fieldLabel,
  onChange,
}: RuleBuilderLabelProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['rule-builder-label'])
  // #endregion

  // #region Events
  function handleRuleChange (state: SelectLabelState) {
    const {
      value,
      operator,
      activated
    } = state
    if (activated && value && operator) {
      onChange({
        field,
        operator,
        value
      })
    } else {
      onChange(null)
    }
  }
  // #endregion
  
  // #region Rendering
  return (
    <SelectRuleLabel
      className={[...classes, className].join(' ')}
      field={fieldLabel}
      onChange={handleRuleChange}
    />
  )
  // #endregion
}