import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import * as Location from 'expo-location'

import { registerUser, login, isLoggedIn } from './src/logic'
import { Login, Register, Landing, Home, MapViewContainer, Profile, ParkBuilder } from './src/components/'
import context from './src/logic/context'

const homeImage = require('./assets/icon-search.png')
const mapImage = require('./assets/icon-location.png')
const buildImage = require('./assets/icon-pick-and-shovel.png')
const profileImage = require('./assets/icon-profile.png')

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

export default function App() {

	const [error, setError] = useState()
	const [user, setUser] = useState()

	useEffect(() => {
		(async () => {//

			try {

				const logged = await isLoggedIn()

				if (logged) {
					//this here => retrieveUser(await context.getToken())
					//this here => setUser for profile
					setUser(true)
				} else {
					setUser(false)
				}
			} catch ({ message }) {
				setError({ message })
			}

		})()

	}, [])

	_getNotificationsPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.NOTIFICATIONS)
		return
	}

	const handleLogin = async (user) => {
		try {
			await login(user)
			setError(null)
			_getNotificationsPermissionsAsync()
			setView('home')
		} catch ({ message }) {
			setError({ message })
			console.log(message)
		}
	}

	const handleRegister = async (newUser) => {
		try {
			await registerUser(newUser)
			setError(null)
			setView('login')
		} catch ({ message }) {
			setError({ message })
			console.log(message)
		}
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
								{props => <Register {...props} extraData={{ handleRegister, error }} />}
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

								// You can return any component that you like here!
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
						<Tab.Screen name="Profile" component={Profile} />
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
