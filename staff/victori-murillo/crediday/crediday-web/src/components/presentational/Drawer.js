import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem,
  ListItemIcon, ListItemText, Toolbar, Typography
} from '@material-ui/core'

import { MoveToInbox as InboxIcon, Mail as MailIcon, Menu as MenuIcon } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useLocation, useHistory } from 'react-router-dom'
import { ListCustomers } from '../'
import { ListCredits } from '../'

function ResponsiveDrawer(props) {
  const { container, view } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const history = useHistory()

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const logout = () => {
    sessionStorage.clear()
    history.push('/login')
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
        {/* {['Clientes', 'Créditos', 'Salir'].map((text, index) => (
          <ListItem button key={text} onClick={
            text === 'Salir' ? logout : undefined
          } >
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem> */}
        {/* ))} */}
        <ListItem button key='Clientes' onClick={() => history.push('/drawer')}>
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary='Clientes' />
        </ListItem>

        <ListItem button key='Créditos' onClick={() => history.push('/drawer/credits')}>
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary='Créditos' />
        </ListItem>

        <ListItem button key='Salir' onClick={logout}>
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary='Salir' />
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {['Semanal', 'Mensual', 'Control de Caja'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

          <Typography variant="h6" noWrap onClick={() => history.push('/drawer')} >
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
      <main className={classes.content} >
        <div className={classes.toolbar} />
        {/* {location === 'customers' && } */}
        {view === 'customers' && <ListCustomers />}
        {view === 'credits' && <ListCredits />}

      </main>
    </div>
  )
}

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
    padding: theme.spacing(0, 0, 0, 0)
  },
}))

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
}



export default ResponsiveDrawer
