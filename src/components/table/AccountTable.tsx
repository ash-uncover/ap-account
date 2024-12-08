import React, { useState } from 'react'
import { AccountLine, DATA } from '../../data/data'

import './AccountTable.css'

export const AccountTable = ({
  data
}) => {
  data.unshift()
  return (
    <table className='account-table'>
      <thead>
        <tr>
          <th className='account-table-row-cell' scope='col'>Account</th>
          <th className='account-table-row-cell' scope='col'>Date</th>
          <th className='account-table-row-cell' scope='col'>Label 1</th>
          <th className='account-table-row-cell' scope='col'>Label 2</th>
          <th className='account-table-row-cell' scope='col'>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => {
          return (
            <AccountTableRow
              key={`data-${index}`}
              data={data}
            />
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <AccountTableRowCell colSpan={4} value='Total' />
          <AccountTableRowCell value={data.reduce((acc, data) => acc + data.value, 0)} />
        </tr>
      </tfoot>
    </table>
  )
}

interface AccountTableRowProperties {
  data: AccountLine
}
const AccountTableRow = ({
  data
}: AccountTableRowProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState<string[]>(['account-table-row'])
  // #endregion

  // #region Events
  function handleMouseEnter() {
    setClasses((classes) => {
      if (!classes.includes('account-table-row--hover')) {
        return [
          ...classes,
          'account-table-row--hover'
        ]
      }
    })
  }
  function handleMouseLeave() {
    setClasses((classes) => {
      return classes.filter((c) => c !== 'account-table-row--hover')
    })
  }
  // #endregion

  // #region Rendering
  return (
    <tr
      className={classes.join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AccountTableRowCell value={data.account} />
      <AccountTableRowCell value={data.date.toLocaleDateString('fr-FR')} />
      <AccountTableRowCell value={data.label1} />
      <AccountTableRowCell value={data.label2} />
      <AccountTableRowCell value={data.value} />
    </tr>
  )
  // #endregion
}

interface AccountTableRowCellProperties {
  colSpan?: number
  value: any
}
const AccountTableRowCell = ({ 
  colSpan,
  value 
}: AccountTableRowCellProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState<string[]>(['account-table-row-cell'])
  // #endregion

  // #region Rendering
  return (
    <td 
      className={classes.join(' ')}
      colSpan={colSpan}
    >
      {value}
    </td>
  )
  // #endregion
}