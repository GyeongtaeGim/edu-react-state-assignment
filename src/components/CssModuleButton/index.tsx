import React, { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import styles from './index.module.css'

const CssModuleButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    return <button {...props} className={classNames(styles.button, className)} ref={ref} />
})

CssModuleButton.displayName = 'CssButton'

export default CssModuleButton