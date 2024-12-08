import React, { useEffect, useState } from 'react'
import { AccountTable } from './table/AccountTable'
import { DataStates } from '@uncover/js-utils'
import { read } from '../utils/CSVReader'

import './App.css'

export const App = () => {
  // #region Hooks
  const [state, setState] = useState(DataStates.NEVER)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/data.csv')
      .then((result) => result.text())
      .then((data) => {
        const readData = read(data.split('\n'))
        readData.shift()
        const jsData = readData.map(
          (line) => {
            const [
              account,
              date,
              label1,
              label2,
              value
            ] = line
            const result =  {
              account,
              date: new Date(date),
              label1,
              label2,
              value: parseFloat(value)
            }
            return result
          }
        )
        setData(jsData)
        setState(DataStates.SUCCESS)
      })
      .catch((error) => {
        console.log(error)
        setState(DataStates.FAILURE)
      })
  }, [])
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  switch (state) {
    case DataStates.NEVER: {
      return (
        <div className='app'>loading</div>
      )
    }
    case DataStates.FAILURE: {
      return (
        <div className='app'>error</div>
      )
    }
    case DataStates.SUCCESS: {
      return (
        <div className='app'>
          <header></header>
          <main>
            <AccountTable data={data} />
          </main>
        </div>
      )
    }
  }
  // #region
}