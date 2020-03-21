import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Image, AsyncStorage } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import logic, { registerUser, retrieveUser, loginUser, logoutUser, isUserLoggedIn } from 'sick-parks-logic'
import { Login, Register, Landing, Home, MapViewContainer, Profile, ParkBuilder } from './src/components/'

const homeImage = require('./assets/icon-search.png')
const mapImage = require('./assets/icon-location.png')
const buildImage = require('./assets/icon-pick-and-shovel.png')
const profileImage = require('./assets/icon-profile.png')

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

logic.__context__.storage = AsyncStorage

export default function App() {
	const [error, setError] = useState()
	const [user, setUser] = useState()
	const [state, setState] = useState()

	useEffect(() => {
		(async () => {

			try {
				if (await isUserLoggedIn()) {
					const user = await retrieveUser()
					setUser(user)
				}
			} catch ({ message }) {
				setError(message)
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
			const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
			}
			throw new Error('Location permission not granted');

		} catch ({ message }) {
			__handleErrors__(message)
			return false
		}

	}

	const handleLogin = async (credentials) => {
		try {
			await loginUser(credentials)
			const user = await retrieveUser()

			if (_getNotificationsPermissionsAsync())
				user.notifications = true

			const location = _getLocationAsync()
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

	const handleRegister = async (newUser) => {
		try {
			await registerUser(newUser)
			setError(null)
			setState('registered')
		} catch ({ message }) {
			__handleErrors__(message)
		}
	}

	const handleLogout = async () => {
		setUser(null)
		setState(null)
		setError(null)
		await logoutUser()

	}


	return (
		<>
			<StatusBar hidden={false} barStyle={'dark-content'} />
			<NavigationContainer>
				{!user && (
					<Stack.Navigator initialRouteName='Landing' >
						<>
							<Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
							<Stack.Screen name="Register">
								{props => <Register {...props} extraData={{ handleRegister, error, state }} />}
							</Stack.Screen>
							<Stack.Screen name="Login">
								{props => <Login {...props} extraData={{ handleLogin, error }} />}
							</Stack.Screen>
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
						<Tab.Screen name="Map" component={MapViewContainer} />
						<Tab.Screen name="Build" component={ParkBuilder} />
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
	icon: {

		width: 25,
		height: 25,
		tintColor: '#EFEBDA'
	}
})
