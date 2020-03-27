const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = ({ companyName, username, email, password, passwordValidation }) => {
  validate.string(companyName, 'Nombre de Compañia')
  validate.string(username, 'Nombre de Usuario')
  validate.string(email, 'Correo electónico')
  validate.email(email)
  validate.string(password, 'Contraseña')
  validate.string(passwordValidation, 'Confirmación de Contraseña ')
  
  if (password !== passwordValidation) throw new Error('Las constraseñas deben coincidir')

  return (async () => {
    const response = await fetch.post(`${API_URL}/companies`, {
      body: { companyName, username, email, password }
    })
    return await handleError(response)
  })()
}