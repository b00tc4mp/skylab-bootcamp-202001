import { loginUser, retrieveUser } from 'sick-parks-logic'
import { __handleErrors__ } from '../../handlers'
import { Login } from '../presentational'
import React, { useState, useEffect } from 'react'

export default function LoginContainer({ navigation, login }) {
    const [error, setError] = useState(null)

    // _getNotificationsPermissionsAsync = async () => {
    // 	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    // 	if (status === 'granted') return true
    // }

    const handleLogin = async (email, password) => {
        try {
            await loginUser(email, password)

            await retrieveUser()

            // user.notifications = await _getNotificationsPermissionsAsync()
            // user.allowLocation = await _getLocationPermissionsAsync()
            setError(null)
            login()
        } catch ({ message }) {
            __handleErrors__(message, setError)
        }
    }

    const handleGoToRegister = () => navigation.navigate('Register')

    return <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} />
}
