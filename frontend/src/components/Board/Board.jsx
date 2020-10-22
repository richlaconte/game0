import React from 'react'
import { Grid, Card } from '@material-ui/core'
import { useMain } from '../../context/main'

import Cell from './Cell'

export default function Board() {
    const { board } = useMain()
    console.log(board)
    return (
        <Grid container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={{ width: board.length * 70 }}
        >
            {
                board.map((row, rowIndex) => {
                    return (
                        <Grid item xs={12} style={{ height: '77px' }}>
                            <Grid container spacing={1} style={{ height: '100%' }} justify='center' alignItems='stretch'>
                                {
                                    row.map((col, colIndex) => {
                                        return (
                                            <Grid item xs={1}>
                                                <Cell col={col} rowIndex={rowIndex} colIndex={colIndex} />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}
