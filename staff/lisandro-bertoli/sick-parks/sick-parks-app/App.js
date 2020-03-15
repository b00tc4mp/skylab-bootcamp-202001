import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Image, StatusBar } from 'react-native'
import { registerUser, login } from './src/logic'
import { Login } from './src/components/'
import { Register } from './src/components'
// import Landing from './src/components/landing'
export default function App() {
	const [view, setView] = useState('register')
	const [error, setError] = useState()

	const handleLogin = async (user) => {
		try {
			await login(user)

			setView('search')
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

	return (
		<View style={styles.container}>
			<StatusBar hidden={false} barStyle={'dark-content'} />
			<Image source={require('./assets/logo.png')} style={styles.logo}></Image>
			{view === 'login' && <Login error={error} onsSubmit={handleLogin} />}
			{view === 'register' && <Register error={error} onSubmit={handleRegister} />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDF4F9',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20
	},
	logo: {
		width: 250,
		height: 250
	}
})
