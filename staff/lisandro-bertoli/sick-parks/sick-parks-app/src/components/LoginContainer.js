import { retrieveUser } from 'sick-parks-logic'
import { __handleErrors__ } from '../handlers'
import { AuthContext } from './AuthProvider';
import Login from './Login'
import React, { useState, useContext } from 'react'

export default function LoginContainer({ navigation }) {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null)

    // _getNotificationsPermissionsAsync = async () => {
    // 	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    // 	if (status === 'granted') return true
    // }

    const handleLogin = async (email, password) => {
        try {
            await login(email, password)

            await retrieveUser()
            // user.notifications = await _getNotificationsPermissionsAsync()
            // user.allowLocation = await _getLocationPermissionsAsync()
            setError(null)
        } catch ({ message }) {
            __handleErrors__(message, setError)
        }
    }

    const handleGoToRegister = () => navigation.navigate('Register')

    return <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} />
}
