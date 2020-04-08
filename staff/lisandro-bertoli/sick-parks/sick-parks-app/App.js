import React, { useState, useEffect } from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
// import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import AppNavigation from './src/navigation'
import config from './config'
import logic, { isAnonymousUser, isUserLoggedIn, logoutUser } from 'sick-parks-logic'
import { __handleErrors__ } from './src/handlers'

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = config.API_URL

export default function App() {
	const [error, setError] = useState(null)
	const [isUser, setIsUser] = useState()
	const [isAnonymous, setIsAnonymous] = useState()
	const [isLoading, setIsLoading] = useState(true)


	const getFonts = () => Font.loadAsync({
		'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
		'montserrat-semi': require('./assets/fonts/Montserrat-SemiBold.ttf'),
		'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
	})

	const __isAllLoaded__ = async () => {
		await getFonts()

		if (await isUserLoggedIn())
			setIsUser(true)
		else if (await isAnonymousUser())
			setIsAnonymous(true)
	}

	if (isLoading) return <AppLoading
		startAsync={__isAllLoaded__}
		onError={({ message }) => __handleErrors__(message, setError)}
		onFinish={() => setIsLoading(false)}
	/>



	if (!isLoading) return (<>
		<StatusBar hidden={false} barStyle={'dark-content'} />
		<AppNavigation error={error} isUser={isUser} isAnonymous={isAnonymous} />
	</>)


}


 // _getLocationPermissionsAsync = async () => {
    // 	try {
    // 		const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // 		if (status === 'granted') {
    // 			return true
    // 		}
    // 		throw new Error('Location permission not granted');

    // 	} catch ({ message }) {
    // 		__handleErrors__(message)
    // 		return false
    // 	}

    // }