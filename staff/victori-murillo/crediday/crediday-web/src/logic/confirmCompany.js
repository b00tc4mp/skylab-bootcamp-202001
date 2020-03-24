import validate from 'crediday-utils'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default (userId) => {
  validate.string(userId, 'userId')

  return axios.patch(`${API_URL}/companies/email/${userId}`)
  .then(response => {
    console.log(response.data)
  })
  .catch(e => {
    console.log('something wrong', e.message)
  })
  
}