import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Divider from '@material-ui/core/Divider'
import Details from './Details'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginTop: '8px',
    marginBottom: '8px',
  },
}))

function PaperIntro ({ link, year, bibtex, authors_key }) {
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper} variant="outlined"
          >
            <Chip component={'a'} href={link} label={link} key="link" clickable variant="outlined"></Chip>
            {/* <Chip label={year} key="year"></Chip> */}
            {/* <Chip label={venue} key="venue" variant="outlined"></Chip> */}
            {/* <Chip label={year} key="year" variant="outlined"></Chip> */}
            {/* {citedby !== "" ? (
                <Chip label={"总引用：" + citedby} key={"citation"}></Chip>
              ) : (
                ""
              )} */}
            <Divider className={classes.divider} />
            <code>{bibtex}</code>
          </Paper>
        </Grid>

        {/* <Col span={6}>
          <Avatar src={img_src} size={128} />
        </Col> */}
      </Grid>
    </div>
  )
}

export default PaperIntro
