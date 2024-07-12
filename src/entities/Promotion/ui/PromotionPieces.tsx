import React from "react";

import {Promotion} from "../../../shared/types";
import classes from "./PromotionPieces.module.css";
import {Square} from "../../Square/ui/Square";
import {move} from "../../../app/game/config";
import {PieceSymbol} from "chess.js";

interface PromotionProps {
    promotion: Promotion
}

const promotionPieces: PieceSymbol[] = ['r', 'n', 'b', 'q']

export function PromotionPieces(props: PromotionProps) {
    const {promotion} = props
    const {from, to, color} = promotion

    function handlePromotion(promotionPiece: PieceSymbol) {
        move({from, to, promotion: promotionPiece})
    }

    const content =
        promotionPieces
            .map((promotionPiece, index) => {
                const pieceImg = require(`../../../assets/${promotionPiece}_${color}.png`)

                return (
                    <Square
                        className={classes.promotionSquare}
                        key={index}
                        black={index % 3 === 0}
                    >
                        <div
                            className={classes.pieceContainer}
                            onClick={() => handlePromotion(promotionPiece)}
                        >
                            <img src={pieceImg} alt="piece"/>
                        </div>
                    </Square>
                )
            })

    return (
        <div className={classes.Promotion}>
                {content}
        </div>
    )
}