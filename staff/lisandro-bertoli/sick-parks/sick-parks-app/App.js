import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Image, AsyncStorage, Dimensions, Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import { AppLoading } from 'expo'

import config from './config'
import logic, {
	registerUser,
	retrieveUser,
	loginUser,
	logoutUser,
	isUserLoggedIn,
	createPark,
	retrievePublishedParks

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
logic.__context__.API_URL = config.API_URL

const getFonts = () => Font.loadAsync({
	'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
	'montserrat-semi': require('./assets/fonts/Montserrat-SemiBold.ttf'),
	'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
})


export default function App() {
	const [error, setError] = useState(null)
	const [user, setUser] = useState()
	const [fontsLoaded, setFontsLoaded] = useState(false)

	useEffect(() => {

		(async () => {
			try {
				if (await isUserLoggedIn()) {
					const user = await retrieveUser()

					setUser(user)
				}
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

	const __handleErrors__ = (error) => {
		setError(error)

		setTimeout(() => {
			setError(null)
		}, 3000)
	}

	const __handleUserUpdate__ = async () => {
		try {
			const updatedUser = await retrieveUser()

			setUser(updatedUser)
		} catch ({ message }) {
			__handleErrors__(message)
		}
	}

	_getNotificationsPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
		if (status === 'granted') return true
	}

	_getLocationPermissionsAsync = async () => {
		try {
			const { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				return true
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

	const handleLogin = async (email, password) => {
		try {
			await loginUser(email, password)

			const user = await retrieveUser()

			user.notifications = await _getNotificationsPermissionsAsync()
			user.allowLocation = await _getLocationPermissionsAsync()

			setUser(user)
			setError(null)
		} catch ({ message }) {
			__handleErrors__(message)
		}
	}

	const handleRegister = async (name, surname, email, password, navigation) => {
		try {
			await registerUser(name, surname, email, password)

			setError(null)
			navigation.navigate('Login')
		} catch ({ message }) {
			__handleErrors__(message)
		}
	}

	const handleCreatePark = async (data, navigation) => {
		try {
			await createPark(data)

			await __handleUserUpdate__()

			Alert.alert('Park created!')

			navigation.dangerouslyGetParent().navigate('Home')

		} catch ({ message }) {
			console.log(message)
			__handleErrors__(message)
		}
	}

	function LandingScreen({ navigation }) {

		const handleOnToLogin = () => navigation.navigate('Login')
		const handleOnToRegister = () => navigation.navigate('Register')
		const handleOnToHome = () => setUser('guest')

		return <Landing onToLogin={handleOnToLogin} onToRegister={handleOnToRegister} onToHome={handleOnToHome} />
	}



	function LoginScreen({ navigation }) {

		const handleGoToRegister = () => navigation.navigate('Register')

		return <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} />
	}

	function RegisterScreen({ navigation }) {

		const handleSubmit = async (name, surname, email, password) => handleRegister(name, surname, email, password, navigation)
		const handleGoToLogin = () => navigation.navigate('Login')

		return <Register onSubmit={handleSubmit} onToLogin={handleGoToLogin} error={error} />
	}

	function ProfileScreen() {
		const [publishedParks, setPublishedParks] = useState([])

		useEffect(() => {
			(async () => {

				if (isUserLoggedIn()) {
					try {
						const parks = await retrievePublishedParks()

						setPublishedParks(parks)

					} catch (error) {
						console.log(error)
					}
				}
			})()


		}, [user])

		const handleOnToLogin = () => setUser(null)

		return <Profile user={user} userParks={publishedParks} onToLogin={handleOnToLogin} onLogout={handleLogout} />
	}

	function HomeScreen() { return <Home user={user} updateUser={__handleUserUpdate__} /> }


	function BuilderScreen({ navigation }) {

		const handleOnToLogin = () => setUser(null)
		const handleNewPark = data => handleCreatePark(data, navigation)

		return <ParkBuilder user={user} onNewPark={handleNewPark} onToLogin={handleOnToLogin} error={error} />
	}

	if (!fontsLoaded) return (
		<AppLoading
			startAsync={getFonts}
			onFinish={() => setFontsLoaded(true)}
		/>
	)

	/*
	
		if(fontsLoaded) return(
			<SafeAreaView>
				<StatusBar hidden={false} barStyle={'dark-content'} />
				<NavigationContainer>
					<AppNAvigation/>
				</NavigationContainer>
			</SafeAreaView>

		)

	 */

	if (fontsLoaded) return (
		<>
			<StatusBar hidden={false} barStyle={'dark-content'} />
			<NavigationContainer>
				{!user && (
					<Stack.Navigator
						initialRouteName='Landing'
						screenOptions={{
							headerBackTitleVisible: false,
							headerStyle: {
								backgroundColor: '#82A4B3',
							},
							headerTitleStyle: {
								fontFamily: 'montserrat-semi'
							},
							headerTintColor: '#EFEBDA'
						}}>
						<>
							<Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingScreen} />
							<Stack.Screen name="Register" component={RegisterScreen} />
							<Stack.Screen name="Login" component={LoginScreen} />
						</>
					</Stack.Navigator>
				)}
				{user && <>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName
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
						}}>
						<Tab.Screen name="Home" component={HomeScreen} />

						<Tab.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} />
						<Tab.Screen name="Build" component={BuilderScreen} />
						<Tab.Screen name="Profile" component={ProfileScreen} />
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
