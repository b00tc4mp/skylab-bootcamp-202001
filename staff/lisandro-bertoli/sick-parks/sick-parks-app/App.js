import React, { useState, useEffect } from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
// import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import AppNavigation from './src/navigation'
import config from './config'
import logic, { retrieveUser, isUserLoggedIn } from 'sick-parks-logic'

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = config.API_URL

const getFonts = () => Font.loadAsync({
	'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
	'montserrat-semi': require('./assets/fonts/Montserrat-SemiBold.ttf'),
	'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
})

export default function App() {
	const [error, setError] = useState(null)
	const [isLogged, setIsLogged] = useState()
	const [fontsLoaded, setFontsLoaded] = useState(false)

	useEffect(() => {

		(async () => {
			try {
				if (await isUserLoggedIn()) setIsLogged(true)
				//const user = await retrieveUser() // maybe not necesary here.
				// ask manu
				//what the fuck to do here
			} catch ({ message }) {
				if (message === 'jwt expired') {
					__handleErrors__('Session has expired')
					await logic.__context__.storage.clear()
				} else {

					__handleErrors__(message)

				}
			}
		})()
	}, [])



	{ !fontsLoaded && <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} /> }

	{ fontsLoaded && <><StatusBar hidden={false} barStyle={'dark-content'} /><AppNavigation logged={isLogged} /></> }

}


/* TODO SEE WHERE to ask for permissions */

// _getNotificationsPermissionsAsync = async () => {
// 	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
// 	if (status === 'granted') return true
// }

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
