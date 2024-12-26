import React, { useEffect, useState } from 'react'
//
import { Dialog } from '../common/Dialog'
import { AccountDataExt, AccountRule, Rule } from '../../model/data'
import { SelectRuleCategory } from './category/SelectRuleCategory'
import { RuleBuilderAccount } from './account/RuleBuilderAccount'
import { RuleBuilderLabel } from './label/RuleBuilderLabel'
import { OPERATOR_KEYS } from '../../model/operators'
// CSS

interface DialogCreateRuleProperties {
  className?: string
  data?: AccountDataExt
  onCancel: () => void
  onCreate: (rule: AccountRule) => void
}
export const DialogCreateRule = ({
  className,
  data,
  onCancel,
  onCreate,
}: DialogCreateRuleProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['dialog-create-rule'])

  const [ruleExact, setRuleExact] = useState(false)

  const [ruleAccount, setRuleAccount] = useState(null)
  const [ruleLabel1, setRuleLabel1] = useState(null)
  const [ruleLabel2, setRuleLabel2] = useState(null)

  const [category, setCategory] = useState(null)

  const [ruleValid, setRuleValid] = useState(false)

  useEffect(() => {
    const valid = Boolean((ruleExact || (ruleAccount || ruleLabel1 || ruleLabel2)) && category)
    setRuleValid(valid)
  }, [ruleExact, ruleAccount, ruleLabel1, ruleLabel2, category])
  // #endregion

  // #region Events
  function handleCheckboxFullMatchChange(event: any) {
    setRuleExact(event.target.checked)
  }
  function handleRuleAccountChange(rule: Rule) {
    setRuleAccount(rule)
  }
  function handleRuleLabel1Change(rule: Rule) {
    setRuleLabel1(rule)
  }
  function handleRuleLabel2Change(rule: Rule) {
    setRuleLabel2(rule)
  }
  function handleRuleCategoryChange(cat: string) {
    setCategory(cat)
  }
  function handleCancelClick() {
    onCancel()
  }
  function handleCreateClick() {
    let rule: Rule
    if (ruleExact) {
      rule = {
        and: [
          { field: 'account', operator: OPERATOR_KEYS.EQUAL, value: data.account },
          { field: 'date', operator: OPERATOR_KEYS.EQUAL, value: data.date },
          { field: 'label1', operator: OPERATOR_KEYS.EQUAL, value: data.label1 },
          { field: 'label2', operator: OPERATOR_KEYS.EQUAL, value: data.label2 }
        ]
      }
    } else {
      const rules = [
        ruleAccount,
        ruleLabel1,
        ruleLabel2
      ].filter(r => Boolean(r))

      if (rules.length === 1) {
        rule = rules[0]
      } else {
        rule = {
          and: rules
        }
      }
    }
    onCreate({
      rule,
      category
    })
  }
  // #endregion

  // #region Rendering
  return (
    <Dialog
      className={[...classes, className].join(' ')}
    >
      <fieldset>
        <legend>Conditions</legend>
        {Boolean(data) ?
          <div>
            <input
              type='checkbox'
              checked={ruleExact}
              onChange={handleCheckboxFullMatchChange}
            />
            <span>Match Selected Data</span>
          </div>
          : null}
        <RuleBuilderAccount
          disabled={ruleExact}
          onChange={handleRuleAccountChange}
        />
        <RuleBuilderLabel
          disabled={ruleExact}
          field='label1'
          fieldLabel='Label 1'
          onChange={handleRuleLabel1Change}
        />
        <RuleBuilderLabel
          disabled={ruleExact}
          field='label2'
          fieldLabel='Label 2'
          onChange={handleRuleLabel2Change}
        />
      </fieldset>

      <fieldset className={[...classes, className].join(' ')}>
        <legend>Category</legend>
        <SelectRuleCategory
          category={category}
          onChange={handleRuleCategoryChange}
        />
      </fieldset>

      <div>
        <button
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button
          disabled={!ruleValid}
          onClick={handleCreateClick}
        >
          Create
        </button>
      </div>
    </Dialog>
  )
  // #endregion
}