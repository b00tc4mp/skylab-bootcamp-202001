import React from 'react'
import { Landing } from '../presentational'
import { setAnonymousUser } from 'sick-parks-logic'

export default function LandingContainer({ navigation }) {

    const handleOnToLogin = () => navigation.navigate('Login')
    const handleOnToRegister = () => navigation.navigate('Register')

    const handleOnToHome = async () => { await setAnonymousUser() }

    return <Landing onToLogin={handleOnToLogin} onToRegister={handleOnToRegister} onToHome={handleOnToHome} />
}