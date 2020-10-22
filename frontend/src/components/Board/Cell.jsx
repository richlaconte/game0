import React from 'react'
import { Card, Popover, Typography } from '@material-ui/core'
import { useMain } from '../../context/main'

export default function Cell({ col, rowIndex, colIndex }) {
    const { checkMoves, moves, checkForMoves, moveCard, board, battle } = useMain()

    let speed = 0
    if (checkMoves.active) {
        speed = board[checkMoves.y][checkMoves.x].occupant.speed
    }

    let color = 'lightGrey'
    let border = ''

    if (!col.isEmpty && col.occupant) {
        if (col.occupant.allegiance === 'friendly') {
            color = 'green'
        } else if (col.occupant.allegiance === 'enemy') {
            color = 'red'
            if (Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= speed) {
                if (Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= moves) {
                    border = '2px dashed orange'
                }
            }
        } else {
            color = 'orange'
        }
    }

    if (col.isEmpty === true) {
        if (checkMoves.active === true) {
            /*
            if (Math.abs(rowIndex - checkMoves.y) <= speed && Math.abs(colIndex - checkMoves.x) <= speed) {
                color = 'lightGreen'
            }
            */
            if (Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= speed) {
                if ((Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= moves) &&
                    (Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= board[checkMoves.y][checkMoves.x].occupant.movesLeft)) {
                    color = 'lightGreen'
                }
            }

        }
    }

    const handleClick = () => {
        if (!col.isEmpty) {
            checkForMoves(colIndex, rowIndex)
        } else if (checkMoves.active && color === 'lightGreen') {
            moveCard(checkMoves.x, checkMoves.y, colIndex, rowIndex)
        }

        if (col.occupant && col.occupant.allegiance === 'enemy' && checkMoves.active) {
            if (Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= speed) {
                if (Math.abs(rowIndex - checkMoves.y) + Math.abs(colIndex - checkMoves.x) <= moves) {
                    battle(colIndex, rowIndex)
                }
            }
        }
    }

    return (
        <Card style={{ height: '100%', width: '100%', backgroundColor: color, cursor: (col.isEmpty && color !== 'lightGreen') ? '' : 'pointer', border: border }} variant='outlined' onClick={handleClick}>
            {
                col.isEmpty === false &&
                <>
                    <Typography>
                        {col.occupant.name}
                    </Typography>
                    <Typography>
                        {col.occupant.attack}/{col.occupant.hp}/{col.occupant.speed}
                    </Typography>
                </>

            }
        </Card>
    )
}
