import {Chess, PartialMove} from "chess.ts"
import {BehaviorSubject} from "rxjs"
import {GameSubject, Promotion} from "../../shared/types";
import {BLACK, WHITE} from "chess.js";
import {SAVED_GAME} from "../../shared/consts";


const chess = new Chess();

export const gameSubject: BehaviorSubject<GameSubject> = new BehaviorSubject({
    board: chess.board(),
    isGameOver: chess.gameOver(),
    turn: chess.turn()
})

export function initGame() {
    const savedGame = localStorage.getItem(SAVED_GAME)
    if (savedGame) {
        const res = chess.load(savedGame)
        console.log(res)
    }

    updateGame()
}

export function resetGame() {
    chess.reset()
    updateGame()
}

export function move(tempMove: PartialMove | string) {
    const legalMove = chess.move(tempMove)
    if (legalMove) {
        gameSubject.next({
            board: chess.board(),
            isGameOver: chess.gameOver(),
            turn: chess.turn()
        })
    }
}

export function handleMove(from: string, to: string) {
    const promotions = chess
        .moves({verbose: true})
        .filter(move => move.promotion)

    const promote = promotions.some(prom => `${prom.from}_${prom.to}` === `${from}_${to}`)
    if (promote) {
        const pendingPromotion = {from, to, color: promotions[0].color}
        updateGame(pendingPromotion)
    }
    const {pendingPromotion} = gameSubject.getValue()
    if (!pendingPromotion) {
        move({from, to})
    }
}

function updateGame(pendingPromotion? : Promotion) {
    const isGameOver = chess.gameOver()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver: chess.gameOver(),
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }

    localStorage.setItem(SAVED_GAME, chess.fen())
    gameSubject.next(newGame)
}

export function getGameResult() {
    if (chess.inCheckmate()) {
        const winner = chess.turn() === "w" ? BLACK : WHITE

        return `CHECKMATE - WINNER : ${winner}`
    }

    if (chess.inDraw()) {
        let reason = `50 - MOVES -RULE`
        if (chess.inStalemate()) {
            reason = `STALEMATE`
        } else if (chess.inThreefoldRepetition()) {
            reason = `REPETITION`
        } else if (chess.insufficientMaterial()) {
            reason = `INSUFFICIENT MATERIAL`
        }

        return `DRAW - ${reason}`
    }

    return 'UNKNOWN MOVE'
}
