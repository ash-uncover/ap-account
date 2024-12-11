import React, { PropsWithChildren, useEffect, useState } from 'react'
import { toggleClass } from '../../utils/ClassHelper'
// CSS
import './SegmentedButtonItem.css'

export interface SegmentedButtonItemProperties extends PropsWithChildren {
  className?: string
  itemKey: string
  selected?: boolean
  onClick?: () => void
}
export const SegmentedButtonItem = ({
  className,
  itemKey,
  selected,
  children,
  onClick,
}: SegmentedButtonItemProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['segmented-button-item'])
  useEffect(() => {
    setClasses((classes) => toggleClass(classes, 'segmented-button-item--selected', selected))
  }, [selected])
  // #endregion

  // #region Rendering
  return (
    <button 
      className={[...classes, className].join(' ')}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
  // #endregion
}