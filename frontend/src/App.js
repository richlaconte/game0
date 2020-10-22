import React from 'react'
import { Grid } from '@material-ui/core'
import { useMain } from './context/main'
import Board from './components/Board/Board'
import DevCommands from './components/dev/DevCommands'
import Hand from './components/Hand'
import PlayerStats from './components/PlayerStats'

function App() {
  const { test } = useMain()
  console.log(test)
  return (
    <Grid container>
      <Grid item>
        <Board />
        <DevCommands />
      </Grid>
      <Grid item>
        <PlayerStats />
        <Hand />
      </Grid>
    </Grid>
  )
}

export default App