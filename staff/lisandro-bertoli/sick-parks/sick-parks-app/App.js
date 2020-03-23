import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Image, AsyncStorage, Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import logic, {
	registerUser,
	retrieveUser,
	loginUser,
	logoutUser,
	isUserLoggedIn,
	createPark
} from 'sick-parks-logic'

import {
	Login,
	Register,
	Landing,
	Home,
	MapViewContainer,
	Profile,
	ParkBuilder
} from './src/components/'

const homeImage = require('./assets/icon-search.png')
const mapImage = require('./assets/icon-location.png')
const buildImage = require('./assets/icon-pick-and-shovel.png')
const profileImage = require('./assets/icon-profile.png')

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = 'http://192.168.1.101:8085/api'

export default function App() {
	const [error, setError] = useState()
	const [user, setUser] = useState()


	useEffect(() => {
		(async () => {
			try {
				if (await isUserLoggedIn()) {
					const user = await retrieveUser()

					setUser(user)
				}
			} catch ({ message }) {
				if (message === 'jwt expired') {
					logic.__context__.storage.clear()
				} else {
					setError(message)

				}
			}
		})()
	}, [])


	const __handleErrors__ = (error) => {
		setError(error)

		setTimeout(() => {
			setError(null)
		}, 3000)
	}


	_getNotificationsPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
		if (status === 'granted') return true
	}

	_getLocationAsync = async () => {
		try {
			const { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
			}
			throw new Error('Location permission not granted');

		} catch ({ message }) {
			__handleErrors__(message)
			return false
		}

	}



	const handleLogout = async () => {
		setUser(null)
		setError(null)
		await logoutUser()

	}

	const handleNewPark = async (data) => {
		try {
			console.log(data)
			await createPark(data)
		} catch ({ message }) {
			__handleErrors__(message)
		}
	}

	function LoginScreen(props) {
		const { navigation } = props
		const handleSubmit = async (email, password) => {
			try {
				await loginUser(email, password)

				const user = await retrieveUser()

				user.notifications = await _getNotificationsPermissionsAsync()

				//this makes login super slowwwww
				const location = await _getLocationAsync()

				if (location) {
					user.allowLocation = true
					user.location = location
					setUser(user)
				} else {
					setUser(user)
				}

				setError(null)
			} catch ({ message }) {
				__handleErrors__(message)
			}
		}

		const handleGoToRegister = () => navigation.navigate('Register')

		return <Login onSubmit={handleSubmit} onToRegister={handleGoToRegister} handleerror={error} />
	}

	function RegisterScreen(props) {
		const { navigation } = props

		const handleSubmit = async (name, surname, email, password) => {
			try {
				await registerUser(name, surname, email, password)
				setError(null)
				navigation.navigate('Login')

			} catch ({ message }) {

				__handleErrors__(message)
			}
		}

		const handleGoToLogin = () => navigation.navigate('Login')

		return <Register onSubmit={handleSubmit} onToLogin={handleGoToLogin} error={error} />
	}


	return (
		<>
			<StatusBar hidden={false} barStyle={'dark-content'} />
			<NavigationContainer>
				{!user && (
					<Stack.Navigator initialRouteName='Landing' >
						<>
							<Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
							<Stack.Screen name="Register" component={RegisterScreen} />
							<Stack.Screen name="Login" component={LoginScreen} />
						</>
					</Stack.Navigator>
				)}

				{user && <>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName;

								if (route.name === 'Home') iconName = homeImage
								else if (route.name === 'Map') iconName = mapImage
								else if (route.name === 'Build') iconName = buildImage
								else if (route.name === 'Profile') iconName = profileImage


								return <Image source={iconName} style={styles.icon} />
							},
						})}
						tabBarOptions={{
							activeTintColor: '#EFEBDA',
							inactiveTintColor: 'lightgrey',
							style: {
								backgroundColor: '#82A4B3'
							}
						}}
					>
						<Tab.Screen name="Home" component={Home} />
						{/* TODO check move screens that top if a lot of params asre passed  */}
						<Tab.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} />
						<Tab.Screen name="Build" component={ParkBuilder} initialParams={{ handleNewPark, error }} />
						<Tab.Screen name="Profile" initialParams={{ user, handleLogout }} component={Profile} />
					</Tab.Navigator>
				</>}
			</NavigationContainer>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDF4F9',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height * 0.855,
	},
	icon: {

		width: 25,
		height: 25,
		tintColor: '#EFEBDA'
	}
})
