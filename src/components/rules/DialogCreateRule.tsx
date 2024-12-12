import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//
import AppSelectors from '../../store/app/app.selectors'
import DataSelectors from '../../store/data/data.selectors'
import { Dialog } from '../common/Dialog'
import { SelectAccountState, SelectRuleAccount } from './SelectRuleAccount'
import { SelectLabelState, SelectRuleLabel } from './SelectRuleLabel'
import { AccountDataExt } from 'src/model/data'
import { SelectRuleCategory1 } from './SelectRuleCategory1'
import { SelectRuleCategory2 } from './SelectRuleCategory2'
// CSS

interface DialogCreateRuleProperties {
  className?: string
  dataLine?: AccountDataExt
}
export const DialogCreateRule = ({
  className,
  dataLine,
}: DialogCreateRuleProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['dialog-create-rule'])
  // #endregion

  // #region Events
  function handleCheckboxFullMatchChange(event: any) {

  }
  function handleRuleAccountChange(state: SelectAccountState) {
    console.log(state)
  }
  function handleRuleLabel1Change(state: SelectLabelState) {
    console.log(state)
  }
  function handleRuleLabel2Change(state: SelectLabelState) {
    console.log(state)
  }
  function handleRuleCategory1Change(cat1: string) {

  }
  function handleRuleCategory2Change(cat2: string) {
    
  }
  // #endregion

  // #region Rendering
  return (
    <Dialog
      className={[...classes, className].join(' ')}
    >
      <fieldset>
        <legend>Conditions</legend>
        {Boolean(dataLine) ?
          <div>
            <input
              type='checkbox'
              checked={false}
              onChange={handleCheckboxFullMatchChange}
            />
            <span>Match Selected Data</span>
          </div>
          : null}
        <SelectRuleAccount
          onChange={handleRuleAccountChange}
        />
        <SelectRuleLabel
          label={'Label 1'}
          onChange={handleRuleLabel1Change}
        />
        <SelectRuleLabel
          label={'Label 2'}
          onChange={handleRuleLabel2Change}
        />
      </fieldset>

      <fieldset>
        <legend>Categories</legend>
        <div>
          <span>Credit</span>
          <input type='checkbox' />
        </div>
        <SelectRuleCategory1
          onChange={handleRuleCategory1Change}
        />
        <SelectRuleCategory2
          onChange={handleRuleCategory2Change}
        />
      </fieldset>
      <div>
        <button>Cancel</button>
        <button>Ok</button>
      </div>
    </Dialog>
  )
  // #endregion
}