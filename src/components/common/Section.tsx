import React, { PropsWithChildren,  useState } from 'react'
// CSS
import './Section.css'

export interface SectionProperties extends PropsWithChildren {
  className?: string
}
export const Section = ({
  className,
  children,
}: SectionProperties) => {
  // #region Hooks
  const [classes, setClasses] = useState(['section'])
  // #endregion

  // #region Rendering
  return (
    <section
      className={[...classes, className].join(' ')}
    >
      {children}
    </section>
  )
  // #endregion
}