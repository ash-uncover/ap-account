import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//
import { AppSelectors } from '../../store/app/app.selectors'
import AppSlice from '../../store/app/app.slice'
import { DataSelectors } from '../../store/data/data.selectors'
// CSS

export const AccountFilterFile = () => {
  // #region Hooks
  const dispatch = useDispatch()
  const data = useSelector(DataSelectors.data)
  const filterFile = useSelector(AppSelectors.filterFile)
  const [files, setFiles] = useState<string[]>([])
  useEffect(() => {
    const newFiles = data.reduce((acc: string[], d) => {
      if (!acc.includes(d.file)) {
        acc.push(d.file)
      }
      acc.sort((a1, a2) => a1.localeCompare(a2))
      return acc
    }, ['<all>'])
    setFiles(newFiles)
  }, [data])
  // #endregion

  // #region Events
  function handleFilterFileChange(event: any) {
    dispatch(AppSlice.actions.setFilterFile({ filter: event.target.value }))
  }
  // #endregion

  // #region Rendering
  return (
    <fieldset>
      <legend>File</legend>
      <select
        name='file'
        value={filterFile}
        onChange={handleFilterFileChange}
      >
        {files.map(
          (f) => (
            <option
              key={f}
              value={f === '<all>' ? '' : f}
            >
              {f}
            </option>
          )
        )}
      </select>
    </fieldset>
  )
  // #endregion
}
