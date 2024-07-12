import {Piece} from "chess.ts";

export interface Promotion {
    from: string
    to: string
    color: string
}

export interface GameSubject {
    pendingPromotion?: Promotion;
    board: (Piece | null)[][]
}