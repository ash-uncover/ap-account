import React, { PropsWithChildren, useEffect, useState } from 'react'
// CSS
import './SegmentedButton.css'

export interface SegmentedButtonProperties extends PropsWithChildren {
  className?: string
  selectedKey: string
  onChange?: (itemKey: string) => void
}
export const SegmentedButton = ({
  className,
  selectedKey,
  children,
  onChange
}: SegmentedButtonProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['segmented-button'])
  // #endregion

  // #region Events
  // #endregion

  // #region Rendering
  const childs = React.Children.map(
    children, 
    // @ts-ignore
    (c) => c && React.cloneElement(c, { 
      // @ts-ignore
      selected: c.props.itemKey === selectedKey,
      onClick: () => {
        // @ts-ignore
        onChange(c.props.itemKey)
      }
    })
  )
  return (
    <div
      className={[...classes, className].join(' ')}
    >
      {childs}
    </div>
  )
  // #endregion
}