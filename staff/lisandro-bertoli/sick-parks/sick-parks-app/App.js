import React, { useState, useEffect, createContext } from 'react'
import { StyleSheet, StatusBar, Image } from 'react-native'
import { registerUser, login, isLoggedIn } from './src/logic'
import { Login, Register, Landing, Home } from './src/components/'
// import * as Location from 'expo-location'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import context from './src/logic/context'
const Stack = createStackNavigator()

const AuthContext = React.createContext();

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
				<Stack.Navigator initialRouteName='Landing' >

					{!user ? (
						<>
							<Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
							<Stack.Screen name="Register">
								{props => <Register {...props} extraData={{ handleRegister, error }} />}
							</Stack.Screen>
							<Stack.Screen name="Login">
								{props => <Login {...props} extraData={{ handleLogin, error }} />}
							</Stack.Screen>

						</>
					) : (
							<>
								<Stack.Screen name="Home" component={Home} />
							</>
						)}

				</Stack.Navigator>

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
	}
})


// { view !== 'home' && < Image source={require('./assets/logo.png')} style={styles.logo}></Image> }
// { view === 'landing' && <Landing onToLogin={handleGoToLogin} onToRegister={handleGoToRegister} /> }
// { view === 'login' && <Login error={error} onSubmit={handleLogin} onToRegister={handleGoToRegister} /> }
// { view === 'register' && <Register error={error} onSubmit={handleRegister} onToLogin={handleGoToLogin} /> }
// { view === 'home' && <Home /* this here => user={user}*/ /> }