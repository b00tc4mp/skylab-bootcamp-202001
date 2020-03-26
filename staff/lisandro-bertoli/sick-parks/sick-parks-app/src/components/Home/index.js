import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Search, TopSearch, Results, ParkDetails } from '../index'
import {
    searchParks,
    retrievePark,
    publishComment,
    votePark,
    approvePark,
    reportPark
} from 'sick-parks-logic'

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

const Stack = createStackNavigator()


export default function Home({ navigation, route }) {
    const [detailedPark, setDetailedPark] = useState()
    const [results, setResults] = useState(false)
    const [location, setLocation] = useState()
    const [currentQuery, setCurrentQuery] = useState()
    const [error, setError] = useState()
    const { params: user } = route


    useEffect(() => {
        try {
            _getLocationAsync()
        } catch ({ message }) {
            console.log(message)
        }
    }, [])


    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)

        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            setLocation([location.coords.longitude, location.coords.latitude])
        }
    }

    const __handleParkUpdate__ = async (id) => {
        try {
            const item = await retrievePark(id)
            setDetailedPark(item)
            setError(null)
        } catch (error) {
            console.log(error)
        }
    }



    function SearchScreen(props) {
        const { navigation } = props

        const handleSearch = async (query) => {
            try {
                setCurrentQuery(query)
                const results = await searchParks({ query, location })

                if (!results.length) setError(`No ${query} parks found`)
                else setError(null)

                setResults(results)
                navigation.navigate('Results')
            } catch ({ message }) {
                setError(message)

                navigation.navigate('Results')

            }

        }

        return <Search onSubmit={handleSearch} />

    }

    function ResultsScreen(props) {
        const { navigation } = props

        const handleGoToDetails = async (id) => {
            try {
                await __handleParkUpdate__(id)

                navigation.navigate('ParkDetails')
            } catch ({ message }) {
                setError(message)


            }

        }

        return <Results results={results} error={error} onToDetails={handleGoToDetails} />
    }

    function TopSearchHeader() {

        const handleSearch = async (query) => {
            try {
                setCurrentQuery(query)

                const results = await searchParks({ query, location })

                if (!results.length) setError(`No ${query} parks found`)
                else setError(null)

                setResults(results)
            } catch ({ message }) {
                setError(message)

            }

        }

        return <TopSearch onSubmit={handleSearch} query={currentQuery} />
    }

    function ParkDetailsScreen(props) {
        const { navigation } = props

        const handleVote = async (vote) => {
            if (!user) throw new Error('this action needs you to be registered')

            try {
                await votePark(user.id, detailedPark.id, vote)

                await __handleParkUpdate__(detailedPark.id)
            } catch ({ message }) {
                //TODO, change error message given by logic
                Alert.alert(message)

            }
        }

        const handleCommentSubmit = async (body) => {
            if (!user) throw new Error('this action needs you to be registered')

            try {
                await publishComment(user.id, detailedPark.id, body)

                await __handleParkUpdate__(detailedPark.id)
            } catch ({ message }) {
                Alert.alert(message)
            }
        }

        const handleContribution = async (action) => {
            if (!user) throw new Error('this action needs you to be registered')

            try {
                if (action === 'unreal' || action === 'duplicate') await reportPark(user.id, detailedPark.id, action)

                else if (action === 'approve') await approvePark(user.id, detailedPark.id)

                await __handleParkUpdate__(detailedPark.id)

                Alert.alert('Thanks for contributing!')

            } catch ({ message }) {
                Alert.alert(message)
            }
        }


        return <ParkDetails
            park={detailedPark}
            onVote={handleVote}
            onCommentSubmit={handleCommentSubmit}
            onContribution={handleContribution}
            error={error} />

    }

    return (

        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: '#82A4B3',
                },
                headerTintColor: '#EFEBDA'
            }}
            mode='modal'
            headerMode='screen'
            initialRouteName='Search'

        >
            <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
            <Stack.Screen name="Results"
                component={ResultsScreen}
                options={{
                    headerTitle: TopSearchHeader
                }} />
            <Stack.Screen name="ParkDetails" component={ParkDetailsScreen} />
        </Stack.Navigator >

    )
}


