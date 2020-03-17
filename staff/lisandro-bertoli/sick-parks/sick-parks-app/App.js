import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { registerUser, login } from './src/logic'
import { Login, Register, Landing, Home, NavBar, ResultsItem, Results } from './src/components/'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function App() {
	const [view, setView] = useState('results')
	const [error, setError] = useState()


	// useEffect(() => {
	// 	(async () => {
	// 		const logged = await isLoggedIn()
	// 		if (logged) setView('home')
	// 		return
	// 	})()
	// }, [])


	const handleLogin = async (user) => {
		try {
			console.log(user.email)
			await login(user)

			setView('home')
		} catch ({ message }) {
			setError(message)
		}
	}

	const handleRegister = async (newUser) => {

		try {

			await registerUser(newUser)

			setView('login')
		} catch ({ message }) {

			setError(message)
		}
	}

	const handleGoToLogin = () => {
		setError(undefined)
		setView('login')
	}

	const handleGoToRegister = () => {
		setError(undefined)
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
					{view === 'home' && <Home onSubmit={handleSearch} />}
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
