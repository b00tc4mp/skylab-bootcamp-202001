import context from './context'
import {retrieveUser, logeOut} from '../logic'

export default ( async function (){
    if(!this.token){
        return false
    } 
    if(this.token){
        try {
            await retrieveUser()

            return false
        } catch (error) {
            
            logeOut()
            return false
        }
    }
    
}).bind(context)