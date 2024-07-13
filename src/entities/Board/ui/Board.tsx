import React, {useEffect, useState} from "react"
import type {Color, Piece} from "chess.ts";

import classes from "./Board.module.css";
import {BoardSquare} from "../../BoardSquare/ui/BoardSquare";

interface BoardProps {
    board: Piece[][]
    turn: Color
}

export function Board(props: BoardProps) {
    const {board, turn} = props
    const [currentBoard, setCurrentBoard] =
        useState<Piece[]>([])

    useEffect(() => {
        console.log(turn)
        let currBoard = (turn === 'w') ? board.flat() : board.flat().reverse()
        setCurrentBoard(currBoard)
    }, [turn, board]);

    function getXYPosition(index: number) {
        const x = turn === 'w' ? index % 8 : Math.abs((index % 8) - 7)
        const y =
            turn === 'w'
                ? Math.abs(Math.floor(index / 8) - 7)
                : Math.floor(index / 8)

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
            {currentBoard?.map((piece:Piece, index: number) => (
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