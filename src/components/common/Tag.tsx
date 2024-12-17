import React, { PropsWithChildren, useEffect, useState } from 'react'
import { toggleClass } from '../../utils/ClassHelper'
// CSS
import './Tag.css'

export type TagColorScheme =
  | 'color-0'
  | 'color-1'
  | 'color-2'
  | 'color-3'
export interface TagProperties extends PropsWithChildren {
  className?: string
  colorScheme?: TagColorScheme
  color?: string
  background?: string
}
export const Tag = ({
  className,
  colorScheme,
  color,
  background,
  children,
}: TagProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['tag'])
  const [style, setStyle] = useState({})
  useEffect(() => {
    setClasses((classes) => {
      let result = toggleClass(classes, 'tag-color-0', !colorScheme || colorScheme === 'color-0')
      result = toggleClass(result, 'tag-color-1', colorScheme === 'color-1')
      result = toggleClass(result, 'tag-color-2', colorScheme === 'color-2')
      result = toggleClass(result, 'tag-color-3', colorScheme === 'color-3')
      return result
    })
    if (colorScheme) {
      setStyle({})
    } else if (color && background) {
      setStyle({
        color,
        background
      })
    }
  }, [colorScheme, color, background])
  // #endregion

  // #region Rendering
  return (
    <span
      className={[...classes, className].join(' ')}
      style={style}
    >
      {children}
    </span>
  )
  // #endregion
}