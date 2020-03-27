import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ConfirmData from './ConfirmData'
import Code from './Code'
import NewData from './NewData'
import Copyright from '../Copyright'
import { confirmData, confirmVerificationCode, updatePassword } from '../../../logic'
import { useLocalStorage } from '../../hooks'
import { useHistory } from 'react-router-dom'

const steps = ['Datos', 'Código', 'Contraseña']

export default () => {
  const classes = useStyles()
  const history = useHistory()

  const [activeStep, setActiveStep] = useState(0)
  const [error, setError] = useState()
  const [feedback, setFeedback] = useState()

  const [company, setCompany] = useLocalStorage('', 'company')
  const [email, setEmail] = useLocalStorage('', 'email')

  const [code, setCode] = useLocalStorage('', 'code')

  const [password, setPassword] = useState()
  const [passwordAgain, setPasswordAgain] = useState()

  const handleNext = async () => {
    setFeedback('loader')

    if (activeStep === 0) {
      try {
        await confirmData({ company, email })
        setActiveStep(activeStep + 1)
        setError(undefined)
        setFeedback(undefined)
      } catch (error) {
        setFeedback(undefined)
        setError(error.message)
      }
    }

    if (activeStep === 1) {

      try {
        await confirmVerificationCode({ code, email })
        setActiveStep(activeStep + 1)
        setError(undefined)
        setFeedback(undefined)

      } catch (error) {
        setFeedback(undefined)
        setError(error.message)
      }

    }

    if (activeStep === 2) {

      try {
        await updatePassword({ code, email, password, passwordAgain })
        setActiveStep(activeStep + 1)
        localStorage.clear()
        setError(undefined)
        setFeedback(undefined)

      } catch (error) {
        setFeedback(undefined)
        setError(error.message)
      }

    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ConfirmData company={company} setCompany={setCompany} email={email} setEmail={setEmail}
          error={error} feedback={feedback} />
      case 1:
        return <Code email={email} code={code} setCode={setCode} error={error} feedback={feedback} />
      case 2:
        return <NewData password={password} setPassword={setPassword}
          passwordAgain={passwordAgain} setPasswordAgain={setPasswordAgain} error={error} feedback={feedback} />
      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Recuperar Contraseña
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Cambio de contraseña exitoso!
                </Typography>
                <br />
                <Button
                  onClick={() => history.push('/login')}
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                >
                  Click aqui para probar la nueva contraseña
                </Button>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button variant="outlined" onClick={handleBack} className={classes.button}>
                        Atrás
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Cambiar Contraseña' : 'Siguiente'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))