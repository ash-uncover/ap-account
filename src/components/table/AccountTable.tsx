import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AppSelectors from '../../store/app/app.selectors'
import DataSelectors from '../../store/data/data.selectors'
import { AccountData, AccountDataExt } from '../../model/data'
import { addClass, removeClass, toggleClass } from '../../utils/ClassHelper'
// CSS
import './AccountTable.css'

export const AccountTable = () => {
  // #region Hooks
  const data = useSelector(AppSelectors.data)
  // #endregion

  // #region Rendering
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
        {data.map((line, index) => {
          return (
            <AccountTableRow
              key={`data-${index}`}
              data={line}
            />
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <AccountTableRowCell colSpan={4} value='Total' />
          <AccountTableRowCell value={data.reduce((acc, line) => acc + line.value, 0)} />
        </tr>
      </tfoot>
    </table>
  )
  // #endregion
}

interface AccountTableRowProperties {
  data: AccountDataExt
}
const AccountTableRow = ({
  data
}: AccountTableRowProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState<string[]>(['account-table-row'])
  useEffect(() => {
    let credit = data.categories.length && data.categories.every(c => c.credit)
    setClasses((classes) => toggleClass(classes, 'account-table-row--credit', credit))
  }, [data])
  // #endregion

  // #region Events
  function handleMouseEnter() {
    setClasses((classes) => addClass(classes, 'account-table-row--hover'))
  }
  function handleMouseLeave() {
    setClasses((classes) => removeClass(classes, 'account-table-row--hover'))
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
      <AccountTableRowCell value={new Date(data.date).toLocaleDateString('fr-FR')} />
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