import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useMain } from '../context/main'

export default function PlayerStats() {
    const { moves, endTurn } = useMain()

    return (
        <Paper style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <Typography>
                Moves: {moves}
            </Typography>
            <button onClick={endTurn}>End Turn</button>
        </Paper>
    )
}
