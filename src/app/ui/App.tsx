import React, {useEffect, useState} from 'react'
import {gameSubject, initGame} from "../game/config";
import {Board} from "../../entities/Board/ui/Board";
import type {Piece} from "chess.ts";

import classes from './App.module.css'

export function App() {
  const [board, setBoard] = useState<Piece | null[][]>([])

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe(
        // @ts-ignore
        game => setBoard(game.board)
    )

    return () => subscribe.unsubscribe()
  }, []);


  return (
      <div className={classes.container}>
          <Board board={board} />
      </div>
  )
}
