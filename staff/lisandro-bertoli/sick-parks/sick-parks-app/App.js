import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { registerUser, login, isLoggedIn } from './src/logic'
import { Login, Register, Landing, Home } from './src/components/'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function App() {
	const [view, setView] = useState()
	const [error, setError] = useState()
	//this here => const [user, setUser] = useState()

	useEffect(() => {
		(async () => {//
			try {
				const logged = await isLoggedIn()

				if (logged) {
					//this here => retrieveUser(await context.getToken())
					//this here => setUser for profile
					setView('home')
				} else {
					//probably will go to home anywat
					setView('landing')
				}
			} catch ({ message }) {
				setError(message)
				console.log('refresh use effect error', message)
			}

		})()
	}, [])


	const handleLogin = async (user) => {
		try {
			await login(user)
			setError(null)

			setView('home')
		} catch ({ message }) {
			setError(message)
			console.log('login, error', message)

		}
	}

	const handleRegister = async (newUser) => {
		try {
			await registerUser(newUser)
			setError(null)
			setView('login')
		} catch ({ message }) {

			setError(message)
			console.log('register error', message)

		}
	}

	const handleGoToLogin = () => {
		setError(null)
		setView('login')
	}

	const handleGoToRegister = () => {
		setError(null)
		setView('register')
	}

	return (
		<>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<KeyboardAwareScrollView contentContainerStyle={styles.container} >
					<StatusBar hidden={false} barStyle={'dark-content'} />
					{view !== 'home' && < Image source={require('./assets/logo.png')} style={styles.logo}></Image>}
					{view === 'landing' && <Landing onToLogin={handleGoToLogin} onToRegister={handleGoToRegister} />}
					{view === 'login' && <Login error={error} onSubmit={handleLogin} onToRegister={handleGoToRegister} />}
					{view === 'register' && <Register error={error} onSubmit={handleRegister} onToLogin={handleGoToLogin} />}
					{view === 'home' && <Home /* this here => user={user}*/ />}
				</KeyboardAwareScrollView>
			</TouchableWithoutFeedback>

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
	logo: {
		width: 250,
		height: 250,
		marginBottom: 10
	}
})
