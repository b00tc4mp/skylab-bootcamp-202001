import { loginUser, retrieveUser } from 'sick-parks-logic'
import { __handleErrors__ } from '../../handlers'
import { Login } from '../presentational'
import React, { useState } from 'react'

export default function LoginContainer({ navigation }) {
    const [error, setError] = useState(null)

    const handleLogin = async (email, password) => {
        try {
            await loginUser(email, password)

            const user = await retrieveUser()

            // user.notifications = await _getNotificationsPermissionsAsync()
            // user.allowLocation = await _getLocationPermissionsAsync()

            setUser(user)
            setError(null)
        } catch ({ message }) {
            __handleErrors__(message, setError)
        }
    }

    const handleGoToRegister = () => navigation.navigate('Register')

    return <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} />
}
