import context from './context'
import { retrieveUser, logeOut } from '../logic'

export default ( function (){
    // if(this.token){
    //     debugger
    //     try {
    //         await retrieveUser()

    //         return true
    //     } catch (error) {
    //         logeOut()
            
    //         return false
    //     }
    // }else{
    //     debugger
    //     return false
    // } 
    debugger
    return !!this.token
}).bind(context)