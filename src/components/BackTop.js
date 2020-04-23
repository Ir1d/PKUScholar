import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import React, { useState } from 'react'

import useThrottledOnScroll from '../lib/useThrottledOnScroll'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    background: theme.palette.background.paper,
    '&:hover': {
      background: theme.palette.background.paper,
    },
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    bottom: theme.spacing(8),
    right: theme.spacing(8),
    zIndex: 2,
  },
}))
export default function BackTop () {
  const classes = useStyles()
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const [yPos, setyPos] = useState(0)
  useThrottledOnScroll(() => setyPos(window.scrollY), 166)
  return (
    <Zoom in={yPos > 400}>
      <Fab disableRipple className={classes.fab} onClick={handleClick}>
        <ArrowUpward />
      </Fab>
    </Zoom>
  )
}
