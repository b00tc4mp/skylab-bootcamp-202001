import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'


import { Search, TopSearch, Results, ParkDetails } from '../index'
// later move styles and this goes here => import styles from './styles'
import { searchParks, retrievePark, publishComment, votePark } from 'sick-parks-logic'
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
                const item = await retrievePark(id)
                setError(null)
                setDetailedPark(item)
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
            try {
                console.log(user)
                if (!user) throw new Error('need to be registered to vote')
                await votePark(user.id, detailedPark.id, vote)
                const updatedPark = await retrievePark(detailedPark.id)
                setDetailedPark(updatedPark)
            } catch ({ message }) {
                console.log(message)
                setError(message)
            }
        }

        // handleCommentSubmit


        return <ParkDetails
            park={detailedPark}
            onVote={handleVote}
            // onCommentSubmit={handleCommentSubmit}
            // onToComments={handleGoToComments}
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


