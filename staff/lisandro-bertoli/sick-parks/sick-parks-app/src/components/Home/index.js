import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import { Search, TopSearch, Results, ParkDetails } from '../index'
// later move styles and this goes here => import styles from './styles'

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

const Stack = createStackNavigator()


export default function Home({ navigation }) {
    const [results, setResults] = useState(false)
    const [location, setLocation] = useState()
    const [error, setError] = useState()



    useEffect(() => {
        try {
            _getLocationAsync()
        } catch ({ message }) {
            setError({ message })
            console.log(message)

        }


    }, [])


    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)

        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            setLocation({ location })
        }
    }

    const parks = [
        {
            name: 'Test1',
            size: 'xl',
            resort: 'Testing',
            verified: true,
            rating: 4.5
        },
        {
            name: 'Test2',
            size: 'xl',
            resort: 'Testing2',
            verified: false,
            rating: 4.5
        }
    ]


    const handleSearch = async (query) => {

        //this here => const result =  await searchParks(query)
        setResults(parks)
        navigation.navigate('Results')

    }

    <View style={styles.container}>
        {!results && <Search onSubmit={handleSearch} />}
        {results && <TopSearch onSubmit={handleSearch} />}
        {results && <Results results={results} />}
    </View >



    return (

        <Stack.Navigator initialRouteName='Search' >
            <Stack.Screen name="Search" options={{ headerShown: false }}>
                {props => <Search {...props} extraData={{ onSubmit: handleSearch }} />}
            </Stack.Screen>
            <Stack.Screen name="Results" >
                {props => <Results {...props} extraData={{ results }} />}
            </Stack.Screen>
            <Stack.Screen name="ParkDetails" >
                {props => <ParkDetails {...props} extraData={{ results }} />}
            </Stack.Screen>
        </Stack.Navigator>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    }
})

