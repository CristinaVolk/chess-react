import {Color, Piece} from "chess.ts";

export interface Promotion {
    from: string
    to: string
    color: string
}

export interface GameSubject {
    board: (Piece | null)[][]
    pendingPromotion?: Promotion
    isGameOver: boolean
    result?: string | null
    turn: Color
}