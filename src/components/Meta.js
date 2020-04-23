import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import CopyrightIcon from '@material-ui/icons/Copyright'
import EditIcon from '@material-ui/icons/Edit'
import HistoryIcon from '@material-ui/icons/History'
import React from 'react'

import AuthorsArray from './AuthorsArray'
import Link from './Link'
import Tags from './Tags'

const useStyles = makeStyles((theme) => ({
  metaicon: {
    verticalAlign: 'text-top',
  },
  paper: {
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  meta: {
    margin: '20px 0',
    paddingLeft: '.5rem',
    textDecoration: 'none',
  },
}))

function Meta ({
  authors,
  authors_key,
  tags,
  relativePath,
  modifiedTime,
  noMeta,
  prefix = 'paper/',
}) {
  const editURL = 'https://github.com/Ir1d/PKUScholar/edit/master/' + prefix
  const historyURL =
    'https://github.com/Ir1d/PKUScholar/commits/master/' + prefix
  const classes = useStyles()
  if (noMeta == 'false') {
    return (
      <Paper className={classes.paper} variant="outlined">
        {authors !== '' ? <AuthorsArray authors={authors} authors_key={authors_key} /> : ''}
        <Divider className={classes.divider} />
        {tags !== '' ? <Tags tags={tags} /> : ''}
        <div className={classes.meta}>
          <span>
            <HistoryIcon fontSize="small" className={classes.metaicon} />
            本页面最近更新：
          </span>
          <span>{modifiedTime}</span>，
          <Link href={historyURL + relativePath}>更新历史</Link>
          <br />
          <span>
            <EditIcon fontSize="small" className={classes.metaicon} />
            发现错误？想一起完善？{' '}
            <Link href={editURL + relativePath} title="编辑此页">
              在 GitHub 上编辑此页！
            </Link>
          </span>
          <br />
          <span>
            <CopyrightIcon fontSize="small" className={classes.metaicon} />
            本页面的全部内容在{' '}
            <strong>
              <Link href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh">
                CC BY-SA 4.0
              </Link>{' '}
              和 <Link href="https://github.com/zTrix/sata-license">SATA</Link>
            </strong>{' '}
            协议之条款下提供，附加条款亦可能应用
          </span>
        </div>
      </Paper>
    )
  } else return <div></div>
}

export default Meta
