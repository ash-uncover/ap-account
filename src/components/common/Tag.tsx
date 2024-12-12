import React, { PropsWithChildren, useEffect, useState } from 'react'
import { toggleClass } from '../../utils/ClassHelper'
// CSS
import './Tag.css'

export type TagColor =
  | 'color-0'
  | 'color-1'
  | 'color-2'
  | 'color-3'
export interface TagProperties extends PropsWithChildren {
  className?: string
  color?: TagColor
}
export const Tag = ({
  className,
  color,
  children,
}: TagProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['tag'])
  useEffect(() => {
    setClasses((classes) => {
      let result = toggleClass(classes, 'tag-color-0', !color || color === 'color-0')
      result = toggleClass(result, 'tag-color-1', color === 'color-1')
      result = toggleClass(result, 'tag-color-2', color === 'color-2')
      result = toggleClass(result, 'tag-color-3', color === 'color-3')
      return result
    })
  }, [color])
  // #endregion

  // #region Rendering
  return (
    <span
      className={[...classes, className].join(' ')}
    >
      {children}
    </span>
  )
  // #endregion
}