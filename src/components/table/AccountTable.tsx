import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//
import AppSelectors from '../../store/app/app.selectors'
import { AccountDataExt } from '../../model/data'
import { addClass, removeClass, toggleClass } from '../../utils/ClassHelper'
import { Tag } from '../common/Tag'
// CSS
import './AccountTable.css'

export interface AccountTableProperties {
  onAddRule: (dataLine: AccountDataExt) => void
}
export const AccountTable = ({
  onAddRule
}: AccountTableProperties) => {
  // #region Hooks
  const [tableData, setTableData] = useState([])
  const data = useSelector(AppSelectors.data)
  const filterRule = useSelector(AppSelectors.filterRule)
  const filterCredit = useSelector(AppSelectors.filterCredit)
  const filterSearch = useSelector(AppSelectors.filterSearch)

  useEffect(() => {
    let newData = data
    if (filterRule === 'NONE') {
      newData = newData.filter((data) => data.categories.length === 0)
    }
    if (filterRule === 'MORE') {
      newData = newData.filter((data) => data.categories.length > 2)
    }
    if (filterCredit === 'CREDIT') {
      newData = newData.filter((data) => data.value > 0)
    }
    if (filterCredit === 'DEBIT') {
      newData = newData.filter((data) => data.value <= 0)
    }
    if (filterSearch) {
      newData = newData.filter(
        (data) => data.label1.toUpperCase().includes(filterSearch.toUpperCase()) || data.label2.toUpperCase().includes(filterSearch.toUpperCase())
      )
    }
    setTableData(newData)
  }, [data, filterRule, filterCredit, filterSearch])
  // #endregion

  // #region Rendering
  return (
    <table className='account-table'>
      <thead>
        <tr className='account-table-header-row'>
          <th className='account-table-row-cell' scope='col'>Account</th>
          <th className='account-table-row-cell' scope='col'>Date</th>
          <th className='account-table-row-cell' scope='col'>Labels</th>
          <th className='account-table-row-cell' scope='col'>Value</th>
          <th className='account-table-row-cell' scope='col'>Category 1</th>
          <th className='account-table-row-cell' scope='col'>Category 2</th>
          <th className='account-table-row-cell' scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((line, index) => {
          return (
            <AccountTableRow
              key={`data-${index}-${line.label1}`}
              data={line}
              onAddRule={onAddRule}
            />
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <AccountTableRowCell colSpan={3}>
            Total
          </AccountTableRowCell>
          <AccountTableRowCell>
            {tableData.reduce((acc, line) => acc + line.value, 0)}
          </AccountTableRowCell>
        </tr>
      </tfoot>
    </table>
  )
  // #endregion
}

interface AccountTableRowProperties {
  data: AccountDataExt
  onAddRule: (dataLine: AccountDataExt) => void
}
const AccountTableRow = ({
  data,
  onAddRule
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
  function handleButtonAddRuleClick() {
    onAddRule(data)
  }
  // #endregion

  // #region Rendering
  return (
    <tr
      className={classes.join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AccountTableRowCell>
        {data.account}
      </AccountTableRowCell>
      <AccountTableRowCell >
        {new Date(data.date).toLocaleDateString('fr-FR')}
      </AccountTableRowCell>
      <AccountTableRowCell bold={true} >
        <div>{data.label1}</div>
        <div>{data.label2}</div>
      </AccountTableRowCell>
      <AccountTableRowCell>
        {data.value}
      </AccountTableRowCell>
      <AccountTableRowCell>
      {data.categories.length ? 
          <Tag>{data.categories[0].category1}</Tag> 
        : ''}
      </AccountTableRowCell>
      <AccountTableRowCell>
        {data.categories.length && data.categories[0].category2 ? 
          <Tag>{data.categories[0].category2}</Tag> 
        : ''}
      </AccountTableRowCell>
      <AccountTableRowCell>
        <button onClick={handleButtonAddRuleClick}>
          +
        </button>
      </AccountTableRowCell>
    </tr>
  )
  // #endregion
}

interface AccountTableRowCellProperties extends PropsWithChildren {
  className?: string
  bold?: boolean
  colSpan?: number
}
const AccountTableRowCell = ({ 
  className,
  bold,
  colSpan,
  children
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
      {children}
    </td>
  )
  // #endregion
}