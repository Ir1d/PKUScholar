import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import kebabCase from 'lodash/kebabCase'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}))

function Header ({ num }) {
  if (num <= 0) return <span>本页面没有标签</span>
  return <span>标签：</span>
}

function Tags ({ tags }) {
  const arr = tags

  const classes = useStyles()
  return (
    <div>
      <Header num={arr ? arr.length : 0}></Header>
      {arr
        ? arr.map(tag => (
          <Chip clickable href={'/tag/' + kebabCase(tag)} key={`tag-${tag}`} variant="outlined" label={'tag-item'} label={` ${tag} `} component={'a'} className={classes.chip}></Chip>
        ))
        : ''}
    </div>
  )
}

export default Tags
