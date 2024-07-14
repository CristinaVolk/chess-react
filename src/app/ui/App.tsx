import React, {useEffect, useState} from 'react'
import {gameSubject, initGame, resetGame} from "../game/config";
import {Board} from "../../entities/Board/ui/Board";
import type {Color, Piece} from "chess.ts";

import classes from './App.module.css'

export function App() {
    const [board, setBoard] = useState<Piece[][]>([])
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [result, setResult] = useState<string>('')
    const [turn, setTurn] = useState<Color>('w')

    useEffect(() => {
        initGame()

        const subscribe = gameSubject.subscribe(
            game => {
                // @ts-ignore
                setBoard(game?.board)
                setIsGameOver(game.isGameOver)
                setResult(game.result ? game.result : '')
                setTurn(game.turn)
            }
        )

        return () => subscribe.unsubscribe()
    }, []);


    return (
        <div className={classes.container}>
            {isGameOver && (
                <h2 className={classes.vertical}>
                    GAME OVER
                    <button onClick={resetGame}>
                        <span className={classes.vertical}>NEW GAME</span>
                    </button>
                </h2>
            )}
            <Board board={board} turn={turn}/>

            {result && <p className={classes.vertical}>{result}</p>}
        </div>
    )
}
