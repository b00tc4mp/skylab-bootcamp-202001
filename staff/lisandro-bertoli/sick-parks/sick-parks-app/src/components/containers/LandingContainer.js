import React from 'react'
import { Landing } from '../presentational'

export default function LandingContainer({ navigation }) {

    const handleOnToLogin = () => navigation.navigate('Login')
    const handleOnToRegister = () => navigation.navigate('Register')
    //const handleOnToHome = () => setUser('guest')

    const handleOnToHome = () => { /*TODO Non user nav*/ }

    return <Landing onToLogin={handleOnToLogin} onToRegister={handleOnToRegister} onToHome={handleOnToHome} />
}