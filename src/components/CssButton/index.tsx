import React, { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import './index.css'

const CssButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    return <button {...props} className={classNames(className, 'button')} ref={ref} />
})

CssButton.displayName = 'CssButton'

export default CssButton