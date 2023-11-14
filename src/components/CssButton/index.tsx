import React, { ButtonHTMLAttributes, forwardRef } from "react";

import './index.css'
import classNames from "classnames";

const CssButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    return <button {...props} className={classNames(className, 'button')} ref={ref} />
})

CssButton.displayName = 'CssButton'

export default CssButton