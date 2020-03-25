import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem,
  ListItemText, Toolbar, Typography, ListItemIcon
} from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useHistory } from 'react-router-dom'
import { ListCustomers } from '../'
import { ListCredits } from '../'
import { Report } from '../'

import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionIcon from '@material-ui/icons/Description';

function ResponsiveDrawer(props) {

  const { container, view } = props
  const classes = useStyles()
  const theme = useTheme()

  const history = useHistory()

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const logout = () => {
    sessionStorage.clear()
    history.push('/login')
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" color="primary">
          Nombre
        </Typography>
      </div>

      <Divider />
      <List>
        <ListItem button key='Clientes' onClick={() => history.push('/drawer/customers')}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary='Clientes' />
        </ListItem>

        <ListItem button key='Créditos' onClick={() => history.push('/drawer/credits')}>
          <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
          <ListItemText primary='Créditos' />
        </ListItem>

        <ListItem button key='Reporte' onClick={() => history.push('/drawer/report')}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary='Reporte' />
        </ListItem>

        <ListItem button key='Salir' onClick={logout}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='Salir' />
        </ListItem>
      </List>
      <Divider />
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
        {view === 'report' && <Report />}

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
