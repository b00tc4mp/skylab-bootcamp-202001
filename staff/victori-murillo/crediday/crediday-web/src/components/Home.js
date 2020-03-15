import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
// import StarIcon from '@material-ui/icons/StarBorder'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { useHistory } from "react-router-dom"
import { Copyright } from '.'

import { Context } from './ContextProvider'

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}))

const tiers = [
  {
    title: 'Básico',
    price: 'Gratis',
    description: ['20 usuarios', '50 créditos registrados', 'Acceso al centro de ayuda', 'Atención por correo'],
    buttonText: 'Regístrate',
    buttonVariant: 'contained',
  },
  {
    title: 'Profesional',
    // subheader: 'Most popular',
    price: '₡30,000',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
      'Phone & email support',
      'Phone & email support',
    ],
    buttonText: 'Regístrate',
    buttonVariant: 'contained',
  },
  {
    title: 'Empresarial',
    price: '₡60,000',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
      'Phone & email support',
      'Phone & email support',
      'Phone & email support',
      'Phone & email support',
    ],
    buttonText: 'Regístrate',
    buttonVariant: 'contained',
  },
]
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
]

export default () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" color="inherit" noWrap className={classes.toolbarTitle}>
            CrediDay
          </Typography>
          {/* <nav> */}
          {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Features
            </Link> */}
          {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Enterprise
            </Link> */}
          {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Support
            </Link> */}
          {/* </nav> */}

          {/* <Button onClick={() => history.push('/dashboard')} color="primary" variant="outlined" className={classes.link}>
            Dashboard
          </Button> */}

          <Button onClick={() => history.push('/login')} color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
          Planes Mensuales
        </Typography>
        <div style={{ margin: '0px 15px' }}>
          <Typography variant="h6" align="justify" color="textSecondary" component="p">
            Controla y automatiza tus inversiones y personal de trabajo con CrediDay App. Lleva el registro de cada
            mínimo detalle de donde está tu dinero y cuanto produce con los reportes diarios, semanales y
            mensuales.
        </Typography>
        </div>

      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  // action={tier.title === 'Básico' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>

                    <Typography component="h2" variant="h4" color="textPrimary">
                      {tier.price}
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>

                  <Button onClick={() => history.push('/register')} fullWidth variant={tier.buttonVariant} color="primary" >
                    {tier.buttonText}
                  </Button>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment >
  )
}