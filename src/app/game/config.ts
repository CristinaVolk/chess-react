import {Chess, PartialMove, Piece} from "chess.ts"
import {BehaviorSubject} from "rxjs"
import {GameSubject, Promotion} from "../../shared/types";


let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'

const chess = new Chess(promotion);

export const gameSubject: BehaviorSubject<GameSubject> = new BehaviorSubject({
    board: chess.board(),
})

export function initGame() {
    updateGame()
}

export function move(tempMove: PartialMove | string) {

    const legalMove = chess.move(tempMove)
    if (legalMove) {
        gameSubject.next({board: chess.board()})
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
    const newGame = {
        board: chess.board(),
        pendingPromotion
    }
    gameSubject.next(newGame)
}
