import React, { PropsWithChildren, useState } from 'react'
// CSS
import './Dialog.css'
import { Section } from './Section'

interface DialogProperties extends PropsWithChildren{
  className?: string
}
export const Dialog = ({
  className,
  children,
}: DialogProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['dialog'])
  // #endregion

  // #region Rendering
  return (
    <div className='dialog-layer'>
      <Section
        className={[...classes, className].join(' ')}
      >
        {children}
      </Section>
    </div>
  )
  // #endregion
}