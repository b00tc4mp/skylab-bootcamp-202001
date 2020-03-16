import validate from 'staycar-utils'
const API_URL = process.env.REACT_APP_API_URL

export default (carPlate) => {

    validate.string(carPlate, 'carPlate')

    return(async () => {
        
        /* const response = await fetch(`${API_URL}/${parkingName}/ticket`) */
    })

}