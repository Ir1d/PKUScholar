import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  introCard: {
    padding: '0 24px',
    p: {
      lineHeight: '2rem',
    },
    ol: {
      lineHeight: '2rem',
    },
    ul: {
      lineHeight: '2rem',
    },
    color: '#304455',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

function AuthorIntro ({ cn_name, intro, img_url, citedby, homePage }) {
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Paper
            // title={cn_name}
            className={classes.paper}
            variant="outlined"
          >
            {intro
              ? intro.map((item, index) =>
                item.indexOf('个人主页') > -1 ? (
                  // 去掉 intro 里面的个人主页，因为和 homepage 字段重复了
                  ''
                ) : (
                  <Chip
                    variant="outlined"
                    label={` ${item
                          .trim()
                          .replace(/\\r/g, '')
                          .replace(/\\n/g, '')} `}
                    key={index}
                  ></Chip>
                ),
              )
              : ''}
            {citedby !== '' ? (
              <Chip variant="outlined" label={'总引用：' + citedby} key={'citation'}></Chip>
            ) : (
              ''
            )}
            {homePage !== '' ? (
              <a href={homePage} target="_blank">
                <Chip variant="outlined" label={'学院主页：' + homePage} key={'homePage'}></Chip>
              </a>
            ) : (
              ''
            )}
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Avatar src={img_url} className={classes.avatar} />
        </Grid>
      </Grid>
    </div>
  )
}

export default AuthorIntro
