const {NotFoundError} = require('events-errors')

const API_URL = process.env.REACT_APP_API_URL

export default function (){

    

    return (async()=>{
        
        const res = await fetch(`${API_URL}/last-events`,{
            method:'GET',
            headers: {'Content-Type':'application/json', "Authorization" : 'Bearer' , },
           
        })
        
        const lastEvents = await res.json()

        if(res.status === 200) return lastEvents

        if(res.status>=400 && res.status<500){

            const error = res.json()

            if(res.status === 404){

                throw new NotFoundError(error)
            }
            throw new Error(error)
        }

        else throw new Error('Server Error')
    })()
}