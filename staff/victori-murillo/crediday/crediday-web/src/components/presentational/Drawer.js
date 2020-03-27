import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../containers/ContextProvider'
import PropTypes from 'prop-types'
import {
  AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem,
  ListItemText, Toolbar, Typography, ListItemIcon
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ListCustomers, ListCredits, Collect, Report } from '../containers'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PeopleIcon from '@material-ui/icons/People'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import DescriptionIcon from '@material-ui/icons/Description'
import PollIcon from '@material-ui/icons/Poll'
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation'
import FaceIcon from '@material-ui/icons/Face'

function ResponsiveDrawer(props) {
  const { loggedUser } = useContext(Context)

  const { container, view } = props
  const classes = useStyles()
  const theme = useTheme()

  const { push } = useHistory()

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const logout = () => {
    sessionStorage.clear()
    push('/login')
  }

  const handlePath = path => {
    setMobileOpen(false)
    push(`/drawer/${path}`)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography style={{ display: 'flex', alignItems: 'center' }} color="primary" variant="h6" noWrap onClick={() => push('/drawer')} >
          <FaceIcon style={{ marginRight: 10 }} /> {loggedUser && loggedUser.firstName}
        </Typography>
      </div>

      <Divider />
      <List>
        <ListItem button key='Clientes' onClick={() => handlePath('customers')}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary='Clientes' />
        </ListItem>

        <ListItem button key='Créditos' onClick={() => handlePath('credits')}>
          <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
          <ListItemText primary='Créditos' />
        </ListItem>

        <ListItem button key='Cobro' onClick={() => handlePath('collect')}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary='Cobro' />
        </ListItem>

        <ListItem button key='Reporte' onClick={() => handlePath('report')}>
          <ListItemIcon><PollIcon /></ListItemIcon>
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
          <Typography style={{ display: 'flex', alignItems: 'center' }} variant="h6" noWrap onClick={() => push('/drawer')} >
            <EmojiTransportationIcon style={{ marginRight: 10 }} /> {loggedUser && loggedUser.company.name.toUpperCase()}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
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
              keepMounted: false,
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
        {view === 'customers' && <ListCustomers />}
        {view === 'credits' && <ListCredits />}
        {view === 'collect' && <Collect />}
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
      marginLeft: drawerWidth
    },
  },
  menuButton: {
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
  container: PropTypes.any,
}

export default ResponsiveDrawer