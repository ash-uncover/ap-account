import React, { useEffect, useState } from 'react'
//
import { Rule } from '../../../model/data'
import { SelectAccountState, SelectRuleAccount } from './SelectRuleAccount'
// CSS

interface RuleBuilderAccountProperties {
  className?: string
  disabled?: boolean
  onChange: (rule: Rule) => void
}
export const RuleBuilderAccount = ({
  className,
  disabled,
  onChange,
}: RuleBuilderAccountProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['rule-builder-account'])
  const [activated, setActivated] = useState<boolean>(false)
  const [ruleDef, setRuleDef] = useState<SelectAccountState>()
  useEffect(() => {
    if (activated && ruleDef?.account && ruleDef?.operator) {
      onChange({
        field: 'account',
        operator: ruleDef.operator,
        value: ruleDef.account
      })
    } else {
      onChange(null)
    }
  }, [activated, ruleDef])
  // #endregion

  // #region Events
  const handleCheckboxActivateChange = (event: any) => {
    setActivated(event.target.checked)
  }
  function handleRuleChange(state: SelectAccountState) {
    setRuleDef(state)
  }
  // #endregion

  // #region Rendering
  return (
    <fieldset className={[...classes, className].join(' ')}>
      <legend>
        <input
          type='checkbox'
          checked={activated}
          disabled={disabled}
          onChange={handleCheckboxActivateChange}
        />
        Account
      </legend>
      <SelectRuleAccount
        disabled={!activated || disabled}
        onChange={handleRuleChange}
      />
    </fieldset>
  )
  // #endregion
}