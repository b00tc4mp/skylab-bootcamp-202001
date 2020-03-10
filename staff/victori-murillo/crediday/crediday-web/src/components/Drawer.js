import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import {AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem,
  ListItemIcon, ListItemText, Toolbar, Typography} from '@material-ui/core'
import {MoveToInbox as InboxIcon, Mail as MailIcon, Menu as MenuIcon } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { Context } from './ContextProvider'
import axios from 'axios'

import Table from './Table'

const drawerWidth = 230

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      // height: '0px'
    },
  },
  menuButton: { // burger 3 lines
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 0, 0, 0),
  },
}))

function ResponsiveDrawer(props) {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const { users, setUsers } = useContext(Context)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.session}`
    axios.get('http://localhost:8000/users-companies')
      .then(({ data }) => {
        console.log(data.users)
        setUsers(data.users)
      })
      .catch(e => console.log(e.message))

  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" color="primary">
          Victori Murillo
        </Typography>
      </div>

      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

          <Typography variant="h6" noWrap >
            Company Name
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'left' : 'right'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: false, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Table />
      </main>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
}

export default ResponsiveDrawer
