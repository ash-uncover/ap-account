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
          <th className='account-table-row-cell' scope='col'>Labels</th>
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
          <AccountTableRowCell colSpan={3} value='Total' />
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
      <AccountTableRowCell bold={true} value={[data.label1, data.label2]} />
      <AccountTableRowCell value={data.value} />
    </tr>
  )
  // #endregion
}

interface AccountTableRowCellProperties {
  className?: string
  bold?: boolean
  colSpan?: number
  value: any
}
const AccountTableRowCell = ({ 
  className,
  bold,
  colSpan,
  value 
}: AccountTableRowCellProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState<string[]>(['account-table-row-cell'])
  useEffect(() => {
    setClasses((classes) => addClass(classes, className))
  }, [className])
  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'account-table-row-cell--bold', bold))
  }, [bold])
  // #endregion

  // #region Rendering
  return (
    <td 
      className={classes.join(' ')}
      colSpan={colSpan}
    >
      {Array.isArray(value) ?
        value.map((v, index) => <div key={index}>{v}</div>)
      : <div>{value}</div>}
    </td>
  )
  // #endregion
}