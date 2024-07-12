import React from "react"
import type {Piece} from "chess.ts";

import classes from "./Board.module.css";
import {BoardSquare} from "../../BoardSquare/ui/BoardSquare";

interface BoardProps {
    board: Piece | null[][] | any
}

export function Board(props: BoardProps) {
    const {board} = props

    function getXYPosition(index: number) {
        const x = index % 8
        const y = Math.abs(Math.floor(index / 8) - 7)

        return { x, y }

    }

    function isBlack(index: number) {
        const {x, y} = getXYPosition(index)

        return (x + y) % 2 === 1
    }

    function getPosition(index: number) {
        const {x, y} = getXYPosition(index)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]

        return `${letter}${y + 1}`
    }

    return (
        <div className={classes.boardContainer}>
            {board?.flat().map((piece:Piece, index: number) => (
                <BoardSquare
                    key={index}
                    piece={piece}
                    black={isBlack(index)}
                    position={getPosition(index)}
                />
            ))}
        </div>
    )
}