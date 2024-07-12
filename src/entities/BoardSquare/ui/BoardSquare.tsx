import React, {useEffect, useState} from "react";
import type {Piece} from "chess.ts";

import {Square} from "../../Square/ui/Square";
import {PieceFigure} from "../../Piece/ui/PieceFigure";

import classes from "./BoardSquare.module.css";
import {useDrop} from "react-dnd";
import {gameSubject, handleMove, move} from "../../../app/game/config";
import type {Promotion} from "../../../shared/types";
import {PromotionPieces} from "../../Promotion/ui/PromotionPieces";


interface BoardSquareProps {
    piece: Piece | null
    black: boolean
    position: string
}

export function BoardSquare(props: BoardSquareProps) {
    const {piece, black, position} = props
    const [promotion, setPromotion] = useState<Promotion | null>(null)
    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item: {id: string}) => {
            const [fromPosition] = item.id.split('_')
            handleMove(fromPosition, position)
        }
    })

    useEffect(() => {
        const subscribe = gameSubject.subscribe(game => {
            const {pendingPromotion} = game
            return pendingPromotion && pendingPromotion.to === position
                ? setPromotion(pendingPromotion)
                : setPromotion(null)
        })

        return () => subscribe.unsubscribe()
    }, []);

    return (
        <div className={classes.square} ref={drop}>
            <Square black={black}>
                {promotion ? <PromotionPieces promotion={promotion}/>
                    : piece ? <PieceFigure piece={piece} position={position} />
                    : null }
            </Square>
        </div>
    )
}