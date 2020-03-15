import validate from 'crediday-utils'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default (companyId) => {
  validate.string(companyId, 'companyId')

  return axios.patch(`${API_URL}/companies/email/${companyId}`)
  .then(response => {
    console.log(response.data)
  })
  .catch(e => {
    console.log('something wrong', e.message)
  })
  
}