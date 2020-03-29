import {validate} from "events-utils"

const API_URL = process.env.REACT_APP_API_URL

export default function (token){

    validate.string(token,"token")

    return (async()=>{
        
        const res = await fetch(`${API_URL}/users`,{
            method:'GET',
            headers: {"Authorization" : `Bearer ${token}`},
           
        })
        
        const {name, surname, email} = await res.json()

        if(res.status === 200) return {name, surname, email}

        if(res.status === 401){
            const error = res.json()

            throw new Error(error)
        }else throw new Error('Unknow Error')
    })()
}