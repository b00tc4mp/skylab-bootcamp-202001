import React from 'react'
import { withRouter } from 'react-router-dom'
import {Header} from '.'
import { isLoggedIn } from '../logic'
import './style/Config.sass'
import { ReactComponent as Add } from './icons/add.svg'
import { ReactComponent as User } from './icons/user.svg'

export default withRouter (function({history}) {
    
    const handleToCreateParking = () => {
        history.push('/create')
    }

    return <> 
        <Header user={isLoggedIn() ? 'Login' : 'Logout'}/>
        <section class="config">
            <div class="config__action" onClick={handleToCreateParking}>
                <Add className="config__image"/>
                <p class="config__text">Create parking</p>
            </div>
            <div class="config__action">
                <User className="config__image"/>
                <p class="config__text">Create User</p>
            </div>
        </section>
    </>
})