import React from "react";
import type {Piece} from "chess.ts";
import classes from "./PieceFigure.module.css";
import {useDrag, DragPreviewImage} from "react-dnd";

interface PieceFigureProps {
    piece: Piece
    position: string
}

export function PieceFigure(props: PieceFigureProps) {
    const {piece, position} = props
    const {type, color} = piece
    const pieceImg = require(`../../../assets/${type}_${color}.png`)

    const [{isDragging}, drag, preview] = useDrag({
        type: 'piece',
        item: {id: `${position}_${type}_${color}`},
        collect: (monitor) => ({isDragging: monitor.isDragging()})
    })

    return (
        <>
            <DragPreviewImage connect={preview} src={pieceImg} />
            <div
                className={classes.PieceFigure}
                ref={drag}
                style={{opacity: isDragging ? 0 : 1}}
            >
                <img src={pieceImg} alt="piece"/>
            </div>
        </>
    )
}