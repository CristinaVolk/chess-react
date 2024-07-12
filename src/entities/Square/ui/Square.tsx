import React, {ReactNode} from "react"
import clsx from "clsx";

import classes from "./Square.module.css";


interface SquareProps {
    children: ReactNode
    black: boolean
    className?: string
}

export function Square(props: SquareProps) {
    const {children, black, className} = props
    const sqColor = black ? classes.black : classes.white


    return (
        <div className={clsx(classes.square, sqColor, className)}>
            {children}
        </div>
    )
}