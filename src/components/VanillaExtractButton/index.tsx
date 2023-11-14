import classNames from "classnames";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

import styles from "./index.css"

const VanillaExtractButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    return <button {...props} className={classNames(className, styles.button)} ref={ref} />
})

VanillaExtractButton.displayName = 'VanillaExtractButton'

export default VanillaExtractButton