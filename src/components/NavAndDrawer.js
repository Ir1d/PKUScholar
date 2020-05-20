import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { Link } from 'gatsby'
import React from 'react'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import GitHubIcon from '@material-ui/icons/GitHub'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import MenuIcon from '@material-ui/icons/Menu'
import SchoolIcon from '@material-ui/icons/School'

import scrollbarStyle from '../styles/scrollbar'
import tabData from '../tabs.yaml'
import Search from './Search'
import SiderContent from './Sidebar'
import Tabs from './Tabs'

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  hiddenDrawer: {
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    [theme.breakpoints.down('md')]: {
      minHeight: 64,
    },
    minHeight: 48 + 64,
    alignItems: 'flex-start',
  },
  drawerPaper: scrollbarStyle(theme, {
    width: drawerWidth,
  }),
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function ResponsiveDrawer (props) {
  const { container, pathname, hasSearch } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const OIWikiGithub = 'https://github.com/ir1d/PKUScholar'
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton> */}
          <Hidden mdDown implementation={'css'}>
            <IconButton component={Link} color="inherit" to="/">
              <SchoolIcon />
            </IconButton>
          </Hidden>
          <Button href="/">
            <Typography variant="h6" noWrap>
            PKU Scholar
            </Typography>
          </Button>
          <div style={{ flexGrow: 1 }} />
          {hasSearch && <Search />}
          <Tooltip title="作者页" placement="bottom" arrow>
            <IconButton component={'a'} href={'/authors'} color={'inherit'}>
              <PeopleAltIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="文章页" placement="bottom" arrow>
            <IconButton component={'a'} href={'/authors'} color={'inherit'}>
              <LibraryBooksIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="GitHub 存储库" placement="bottom" arrow>
            <IconButton component={'a'} href={OIWikiGithub} color={'inherit'}>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        {/* <Hidden mdDown implementation={'css'}>
          <Tabs tabs={tabData} location={pathname} />
        </Hidden> */}
      </AppBar>
      {/* <Hidden xlUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SiderContent {...props} />
        </Drawer>
      </Hidden> */}
      {/* <Hidden mdDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <SiderContent {...props} />
        </Drawer>
      </Hidden> */}
    </>
  )
}

export default ResponsiveDrawer
