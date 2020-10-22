import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { useMain } from '../context/main'

export default function Hand() {
    const { hand, drawCard, spawnCard } = useMain()

    return (
        <Grid container>
            {
                hand.map((card) => {
                    return (
                        <Grid item>
                            <Paper style={{ width: '150px', height: '200px' }}>
                                <Typography>
                                    {card.name}
                                </Typography>
                                <Typography>
                                    Attack: {card.attack}
                                </Typography>
                                <Typography>
                                    HP: {card.hp}
                                </Typography>
                                <Typography>
                                    Speed: {card.speed}
                                </Typography>
                                <button onClick={() => spawnCard(card)}>spawn</button>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}
