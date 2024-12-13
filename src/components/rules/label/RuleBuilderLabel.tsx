import React, { useCallback, useEffect, useState } from 'react'
//
import { AccountField, Rule } from '../../../model/data'
import { SelectLabelState, SelectRuleLabel } from './SelectRuleLabel'
import { OPERATOR_KEYS } from '../../../model/operators'
// CSS

interface RuleBuilderLabelProperties {
  className?: string
  disabled?: boolean
  field: AccountField
  fieldLabel: string
  onChange: (rule: Rule) => void
}
export const RuleBuilderLabel = ({
  className,
  disabled,
  field,
  fieldLabel,
  onChange,
}: RuleBuilderLabelProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['rule-builder-label'])
  const [activated, setActivated] = useState<boolean>(false)
  const [ruleDef, setRuleDef] = useState<SelectLabelState[]>([{
    operator: OPERATOR_KEYS.EQUAL,
    value: ''
  }])

  const buildRule = useCallback((state: SelectLabelState) => {
    return {
      field,
      operator: state.operator,
      value: state.value
    }
  }, [field])

  useEffect(() => {
    const valid = activated && (
      ruleDef.length && ruleDef.every(r => r.value && r.operator)
    )
    if (valid) {
      if (ruleDef.length === 1) {
        onChange(buildRule(ruleDef[0]))
      } else {
        onChange({
          and: ruleDef.map(buildRule)
        })
      }
    } else {
      onChange(null)
    }
  }, [activated, ruleDef])
  // #endregion

  // #region Events
  const handleCheckboxActivateChange = (event: any) => {
    setActivated(event.target.checked)
  }
  function handleRuleChange(state: SelectLabelState, index: number) {
    setRuleDef(
      (rules) => {
        const result = [...rules]
        result[index] = state
        return result
      }
    )
  }
  function handleDeleteCondition (index: number) {
    setRuleDef(
      (rules) => {
        const result = rules.filter((r, i) => i !== index)
        return result
      }
    )
  }
  function handleAddCondition() {
    setRuleDef(
      (rules) => {
        return [
          ...rules,
          {
            operator: OPERATOR_KEYS.EQUAL,
            value: ''
          }
        ]
      }
    )
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
        {fieldLabel}
      </legend>
      {ruleDef.map(
        (rule, index) => {
          return (
            <div key={index}>
              <SelectRuleLabel
                className={[...classes, className].join(' ')}
                disabled={!activated || disabled}
                field={fieldLabel}
                onChange={(state) => handleRuleChange(state, index)}
              />
              {ruleDef.length > 1 ?
                <button
                  disabled={!activated || disabled}
                  onClick={() => handleDeleteCondition(index)}
                >
                  -
                </button>
                : null}
            </div>
          )
        }
      )}
      <div>
        <button
          disabled={!activated || disabled}
          onClick={handleAddCondition}
        >
          Add Condition
        </button>
      </div>
    </fieldset>
  )
  // #endregion
}