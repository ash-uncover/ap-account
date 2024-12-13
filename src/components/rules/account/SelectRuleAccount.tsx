import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//
import DataSelectors from '../../../store/data/data.selectors'
import { toggleClass } from '../../../utils/ClassHelper'
import { SelectOperator } from '../SelectOperator'
import { OperatorKey, OPERATORS } from '../../../model/operators'
// CSS

export interface SelectAccountState {
  activated: boolean
  operator: OperatorKey
  account: string
}
interface SelectRuleAccountProperties {
  className?: string
  disabled?: boolean
  onChange: (state: SelectAccountState) => void
}
export const SelectRuleAccount = ({
  className,
  disabled,
  onChange,
}: SelectRuleAccountProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['select-rule-account'])
  
  const [activated, setActivated] = useState<boolean>(false)
  const [operator, setOperator] = useState<OperatorKey>()
  const [account, setAccount] = useState<string>('')
  const [accounts, setAccounts] = useState<string[]>([])
  
  const data = useSelector(DataSelectors.data)

  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'select-rule-account--disabled', disabled))
  }, [disabled])
  
  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'select-rule-account--activated', activated))
  }, [activated])
  
  useEffect(() => {
    const newAccounts = data.reduce((acc: string[], d) => {
      if (!acc.includes(d.account)) {
        acc.push(d.account)
      }
      acc.sort((a1, a2) => a1.localeCompare(a2))
      return acc
    }, ['<all>'])
    setAccounts(newAccounts)
  }, [data])

  // #endregion

  // #region Events
  const handleCheckboxActivateChange = useCallback((event: any) => {
    setActivated(event.target.checked)
    onChange({
      activated: event.target.checked,
      operator,
      account
    })
  }, [operator, account])
  const handleOperatorChange = useCallback((operator: OperatorKey) => {
    setOperator(operator)
    onChange({
      activated,
      operator,
      account
    })
  }, [activated, account])
  const handleAccountChange = useCallback((event: any) => {
    setAccount(event.target.value)
    onChange({
      activated,
      operator,
      account: event.target.value
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
      
      <span>Account</span>
      
      <SelectOperator 
        disabled={!activated || disabled}
        name='operator-account'
        operator={operator}
        operators={[OPERATORS.EQUAL, OPERATORS.NOT_EQUAL]}
        onChange={handleOperatorChange}
      />
      
      <select 
        name='account'
        disabled={!activated || disabled}
        onChange={handleAccountChange}
      >
        {accounts.map(
          (acc) => (
            <option
              key={acc}
              value={acc === '<all>' ? '' : acc}
            >
              {acc}
            </option>
          )
        )}
      </select>
    </div>
  )
  // #endregion
}