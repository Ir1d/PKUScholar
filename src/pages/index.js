import { graphql } from 'gatsby'
import React, { useState, useEffect, useRef } from 'react'
// import { Card, Row, Col, Select, Menu, Input } from 'antd'
import Helmet from 'react-helmet'
// import theme from '../theme'
// const { Option } = Select
// const { SubMenu } = Menu
// const { Search } = Input
import Backdrop from '@material-ui/core/Backdrop'
import grey from '@material-ui/core/colors/grey'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import clsx from 'clsx'

import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import lightBlue from '@material-ui/core/colors/lightBlue'
import Link from '../components/Link'
import Tags from '../components/Tags'
import Layout from '../components/Layout'

import scrollbarStyle from '../styles/scrollbar'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  searchResultPrimary: {
    '& em': {
      fontStyle: 'normal',
      color: fade(theme.palette.primary.main, 0.95),
      background: fade(theme.palette.primary.main, 0.08),
    },
  },
  searchResultSecondary: {
    '& em': {
      fontStyle: 'normal',
      padding: '0 0 2px',
      boxShadow: `inset 0 -2px 0 0 ${fade(theme.palette.primary.main, 0.5)}`,
      // 使用 box shadow 模拟下划线
    },
  },
  inputRoot: {
    color: 'inherit',
    display: 'block',
    // margin: theme.spacing(1, 1, 1, 0),
    marginLeft: `calc(1em + ${theme.spacing(4)}px)`,
    marginTop: '2px',
    marginBottom: '2px',
  },
  smallScreenInputRoot: {
    color: 'inherit',
    display: 'block',
    // margin: theme.spacing(1, 1, 1, 0),
    marginLeft: `calc(1em + ${theme.spacing(4)}px)`,
    marginTop: '9px',
    marginBottom: '6px',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    width: '100%',
    // width: '100vw',
    // [theme.breakpoints.up('md')]: {
    //   // transition: theme.transitions.create('width'),
    //   // '&:focus': {
    //   //   width: '30vw',
    //   // },

    // },
    [`&::-webkit-search-decoration,
       &::-webkit-search-cancel-button,
       &::-webkit-search-results-button,
       &::-webkit-search-results-decoration`]: {
      display: 'none',
    },
  },
  resultPaper: scrollbarStyle(theme, {
    marginLeft: '50px',
    marginTop: '12px',
    width: '98%',
    // minWidth: `calc(30vw + 1em + ${theme.spacing(4)}px)`,
    // maxWidth: '50vw',
    // position: 'absolute',
    // right: '0 !important',
    top: '100%',
    // maxHeight: '80vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: theme.zIndex.drawer - 10,
  }),
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // maxWidth: `calc(30vw + 1em + ${theme.spacing(4)}px)`,
    marginRight: theme.spacing(7),
    marginLeft: 0,
    // width: '100%',
    zIndex: theme.zIndex.drawer - 2,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchColorBlack: {
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
  },
  searchColorWhite: {
    backgroundColor: fade(theme.palette.common.white, 0.8),
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'none',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchMessage: {
    padding: '8px 8px 8px 20px',
    backgroundColor: grey[100],
  },
  smallScreenSearchIcon: {
    padding: theme.spacing(1.5),
    height: '100%',
    // position: 'absolute',
    // pointerEvents: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallScreenReturnIcon: {
    padding: theme.spacing(1.5),
    // padding: 0,
    // height: '100%',
    position: 'absolute',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dialogHeader: {
    display: 'block',
    alignItems: 'center',
    '-webkit-border-radius': '0',
    '-moz-border-radius': '0',
    'border-radius': '0',
  },
  example: {
    display: 'block',
    marginLeft: '20px',
    marginTop: '20px',
    marginBottom: '20px',

    color: lightBlue[500],
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'none',
    },
    '&.active': {
      color: theme.palette.text.primary,
    },
  },
  paperRoot: {
    marginTop: '20px',
  },
}))

function SearchResultList (props) {
  const { result, isFirstRun, searchKey, classes } = props
  const resultCount = result.length
  // const resultCount = 5
  // const res_new = [
  //   {
  //     title:
  //       'AAGAN - Enhanced Single Image Dehazing With Attention-to-Attention Generative Adversarial Network.',
  //     highlight: 'https://doi.org/10.1109/ACCESS.2019.2957057',
  //   },
  //   {
  //     title:
  //       'Hemifield-specific Correlations between Cue-related Blood Oxygen Level Dependent Activity in Bilateral Nodes of the Dorsal Attention Network and Attentional Benefits in a Spatial Orienting Paradigm.',
  //     highlight: 'https://doi.org/10.1162/jocn_a_01338',
  //   },
  //   {
  //     title:
  //       'Is It Worth the Attention? A Comparative Evaluation of Attention Layers for Argument Unit Segmentation.',
  //     highlight: 'https://doi.org/10.18653/v1/w19-4509',
  //   },
  //   {
  //     title:
  //       'AttentionDTA - prediction of drug-target binding affinity using attention model.',
  //     highlight: 'https://doi.org/10.1109/BIBM47256.2019.8983125',
  //   },
  //   {
  //     title:
  //       'Paying More Attention to Attention - Improving the Performance of Convolutional Neural Networks via Attention Transfer.',
  //     highlight: 'https://openreview.net/forum?id=Sks9_ajex',
  //   },
  // ]
  return resultCount !== 0 ? (
    <>
      <Typography variant="body1" className={classes.searchMessage}>
        共找到 {resultCount} 条搜索结果：
      </Typography>
      <List>
        {result.map((item) => {
          /* Render article */
          return (
            <ListItem
              button
              divider
              component="a"
              href={item.url}
              key={item.url}
            >
              <ListItemIcon>
                <FindInPageIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                primary={
                  <Typography
                    variant="h6"
                    className={classes.searchResultPrimary}
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  />
                }
                secondary={
                  <div
                    className={classes.searchResultSecondary}
                    dangerouslySetInnerHTML={{
                      __html: item.highlight,
                    }}
                  />
                }
              />
            </ListItem>
          )
        })}
      </List>
    </>
  ) : !isFirstRun.current ? (
    <Typography variant="body1" className={classes.searchMessage}>
      没有找到符合条件的结果
    </Typography>
  ) : (
    ''
  )
}

function useDebounce (value, timeout) {
  const [state, setState] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout)

    return () => clearTimeout(handler)
  }, [value, timeout])

  return state
}

function useWindowDimensions () {
  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height
  //   };
  // }

  const [windowDimensions, setWindowDimensions] = useState({
    width: null,
    height: null,
  })
  // const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    function handleResize () {
      // console.log('updated window')
      setWindowDimensions({
        width: window.innerWidth,
        // height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

function Search ({ backdrop }) {
  const [searchKey, setSearchKey] = useState('')
  const [result, setResult] = useState([])
  const [open, setOpen] = useState(false)
  const debouncedKey = useDebounce(searchKey, 500)
  const classes = useStyles()

  const isFirstRun = useRef(true)
  const hasBackDrop = backdrop === undefined ? true : backdrop
  // console.log(hasBackDrop, backdrop)

  useEffect(() => {
    if (searchKey !== '') {
      const result = fetch(
        `http://pku.oi-wiki.com:8443/?s=${encodeURIComponent(searchKey)}`,
        {
          // credentials: "same-origin"
        },
      )
        .then((response) => response.json())
        .then((result) => {
          // Rsize = result.length
          return result
        })

      result.then((val) => {
        // the order is tricky here
        // set result after set isFirstRun
        // so when there's no result on first run
        // the user is prompted with the notice
        isFirstRun.current = false
        setResult(val)
      })
    } else {
      setResult([])
    }
  }, [debouncedKey])

  const { width } = useWindowDimensions()
  // console.log(`width: ${width} ~ height: ${height}`);

  // 600px is sm
  if (width > 600) {
    return (
      <>
        <div className={clsx(classes.search, classes.searchColorWhite)}>
          <div className={classes.searchIcon}>
            <SearchIcon fontSize="small" />
          </div>
          <TextField
            type="search"
            placeholder="键入以开始搜索"
            onChange={(ev) => {
              setSearchKey(ev.target.value)
            }}
            onFocus={() => {
              setOpen(true)
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            variant="outlined"
            fullWidth
            defaultValue={searchKey}
          />
          {open && (
            <Paper className={classes.resultPaper}>
              <SearchResultList
                searchKey={searchKey}
                result={result}
                isFirstRun={isFirstRun}
                classes={classes}
              />
            </Paper>
          )}
        </div>
      </>
    )
  } else {
    return (
      <>
        {/* <div  > */}
        <IconButton
          onClick={() => {
            setOpen(true)
          }}
          className={classes.smallScreenSearchIcon}
        >
          <SearchIcon />
        </IconButton>
        {/* </div> */}
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          fullWidth={true}
          fullScreen
        >
          <Paper component="div" className={classes.dialogHeader}>
            {/* <div > */}
            <IconButton
              className={classes.smallScreenReturnIcon}
              onClick={() => {
                setOpen(false)
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            {/* </div> */}
            <TextField
              type="search"
              placeholder="键入以开始搜索"
              onChange={(ev) => {
                setSearchKey(ev.target.value)
              }}
              // onFocus={() => {
              //   setOpen(true)
              // }}
              classes={{
                root: classes.smallScreenInputRoot,
                input: classes.inputInput,
              }}
              autoFocus
              variant="outlined"
              fullWidth
              defaultValue={searchKey}
            />
          </Paper>
          {open && (
            <SearchResultList
              searchKey={searchKey}
              result={result}
              isFirstRun={isFirstRun}
              classes={classes}
            />
          )}
        </Dialog>
      </>
    )
  }
}

function ExampleComponent () {
  // const classes = useStyles()
  return (
    <>
      <Divider
        style={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />
      <Paper
        variant="outlined"
        style={{
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/journals/jss/YangZGZ013/"
          style={{
            display: 'block',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px',

            color: lightBlue[500],
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'none',
            },
            '&.active': {
              color: '#FFF',
            },
          }}
        >
          Lifetime and QoS-aware energy-saving buffering schemes
        </Typography>
      </Paper>
      <Paper
        variant="outlined"
        style={{
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/journals/titb/HuangCBDCGMZZJX14/"
          style={{
            display: 'block',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px',

            color: lightBlue[500],
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'none',
            },
            '&.active': {
              color: '#FFF',
            },
          }}
        >
          WE-CARE: An Intelligent Mobile Telecardiology System to Enable mHealth
          Applications
        </Typography>
      </Paper>
      <Paper
        variant="outlined"
        style={{
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/journals/wpc/TongTZBY19/"
          style={{
            display: 'block',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px',

            color: lightBlue[500],
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'none',
            },
            '&.active': {
              color: '#FFF',
            },
          }}
        >
          Trajectory-Based User Encounter Prediction Over Wireless Sensor
          Networks
        </Typography>
      </Paper>
      <Paper
        variant="outlined"
        style={{
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/author/87/2334/"
          style={{
            display: 'block',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px',

            color: lightBlue[500],
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'none',
            },
            '&.active': {
              color: '#FFF',
            },
          }}
        >
          边凯归
        </Typography>
      </Paper>
      <Paper
        variant="outlined"
        style={{
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/author/c/LijunChen2/"
          style={{
            display: 'block',
            marginLeft: '20px',
            marginTop: '20px',
            marginBottom: '20px',

            color: lightBlue[500],
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'none',
            },
            '&.active': {
              color: '#FFF',
            },
          }}
        >
          陈立军
        </Typography>
      </Paper>
    </>
  )
}

//
function BlogIndex ({ data, location, children = [], posts, group }) {
  // const theme = useTheme()
  // const theme = useTheme()
  // const classes = useStyles()
  return (
    <Layout location="/" noMeta="true" hasSearch={false}>
      <Helmet title="PKU Scholar"></Helmet>
      <Typography variant="h2" component="h2" align="center">
        {' '}
        Welcome to PKU Scholar{' '}
      </Typography>
      {/* <div>
          <ul>
            <li>
              <Link to="/papers">Papers</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
          </ul>
        </div> */}
      <Search backdrop={false} />
      {/* <Search
          placeholder="键入进行搜索"
          onSearch={value =>  value}
          style={{ 'margin-top': 50, 'margin-bottom': 300 }}
        /> */}
      <ExampleComponent />
    </Layout>
  )
}
// export const pageQuery = graphql`
//   query blogIndex {
//     allMdx { }
//   }
// `
export default BlogIndex
