import React, { useState } from 'react'
//
import { Rule } from '../../../model/data'
import { SelectAccountState, SelectRuleAccount } from './SelectRuleAccount'
// CSS

interface RuleBuilderAccountProperties {
  className?: string
  onChange: (rule: Rule) => void
}
export const RuleBuilderAccount = ({
  className,
  onChange,
}: RuleBuilderAccountProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['rule-builder-account'])
  // #endregion

  // #region Events
  function handleRuleChange (state: SelectAccountState) {
    const {
      account,
      operator,
      activated
    } = state
    if (activated && account && operator) {
      onChange({
        field: 'account',
        operator,
        value: account
      })
    } else {
      onChange(null)
    }
  }
  // #endregion
  
  // #region Rendering
  return (
    <SelectRuleAccount
      className={[...classes, className].join(' ')}
      onChange={handleRuleChange}
    />
  )
  // #endregion
}