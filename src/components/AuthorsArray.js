import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}))

function Header ({ num }) {
  if (num <= 0) return <span>本页面未记录作者</span>
  if (num == 1) return <span>作者：</span>
  if (num > 1) return <span>作者们：</span>
}
function AuthorsArray ({ authors, authors_key }) {
  const arr = authors
  const classes = useStyles()
  // authors == null ? null : authors == undefined ? null : authors.split(",")
  return (
    <div>
      <Header num={arr ? arr.length : 0}></Header>
      {arr
        ? arr.map((author, idx) => (
          <Chip label={` ${author} `} clickable href={'/author/' + authors_key[idx].trim()} key={author} className={classes.chip} component={'a'} variant="outlined"></Chip>
        ))
        : ''}
    </div>
  )
}

export default AuthorsArray
