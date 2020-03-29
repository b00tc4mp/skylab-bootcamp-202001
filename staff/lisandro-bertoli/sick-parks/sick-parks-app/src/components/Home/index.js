import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../Search'
import TopSearch from '../TopSearch'
import Results from '../Results'
import ParkDetails from '../ParkDetails'
import {
    searchParks,
    retrievePark,
    publishComment,
    votePark,
    approvePark,
    reportPark,
    updatePark,
    deletePark
} from 'sick-parks-logic'

const Stack = createStackNavigator()

export default function Home({ user, updateUser }) {
    const [detailedPark, setDetailedPark] = useState()
    const [results, setResults] = useState(false)
    const [location, setLocation] = useState()
    const [currentQuery, setCurrentQuery] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function ({ coords }) {
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
            })
        })
    }, [])

    const __handleParkUpdate__ = async (id) => {
        try {
            const item = await retrievePark(id)
            setDetailedPark(item)

            setError(null)
        } catch (error) {
            if (error.name === 'NotFoundError') Alert.alert(error.message)
            console.log(error.message)
        }
    }


    function SearchScreen({ navigation }) {
        const handleSearch = async (query) => {
            try {
                setCurrentQuery(query)
                const results = await searchParks(query, [location.longitude, location.latitude])

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

    function ResultsScreen({ navigation }) {
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

                const results = await searchParks(query, [location.longitude, location.latitude])

                if (!results.length) setError(`No ${query} parks found`)
                else setError(null)

                setResults(results)
            } catch ({ message }) {
                setError(message)
            }
        }
        return <TopSearch onSubmit={handleSearch} query={currentQuery} />
    }

    function ParkDetailsScreen({ navigation }) {
        const handleDeletePark = async () => {
            try {
                navigation.popToTop()

                await deletePark(detailedPark.id, user.id)
                await updateUser()

                Alert.alert('Park deleted')
            } catch ({ message }) {
                Alert.alert(message)
            }
        }

        const handleUpdate = async (update) => {
            try {
                await updatePark(user.id, detailedPark.id, update)

                __handleParkUpdate__(detailedPark.id)
            } catch ({ message }) {
                Alert.alert(message)
            }
        }

        const handleVote = async (vote) => {
            if (user === 'guest') return Alert.alert('this action needs you to be registered')

            try {
                await votePark(user.id, detailedPark.id, vote)

                __handleParkUpdate__(detailedPark.id)
            } catch ({ message }) {
                Alert.alert('This action cannot be performed twice by the same user')
            }
        }

        const handleCommentSubmit = async (body) => {
            if (user === 'guest') return Alert.alert('this action needs you to be registered')

            try {
                await publishComment(user.id, detailedPark.id, body)

                __handleParkUpdate__(detailedPark.id)
            } catch ({ message }) {
                Alert.alert(message)
            }
        }

        const handleContribution = async (action) => {
            if (user === 'guest') return Alert.alert('this action needs you to be registered')

            try {
                if (action === 'unreal' || action === 'duplicate') await reportPark(user.id, detailedPark.id, action)

                else if (action === 'approve') await approvePark(user.id, detailedPark.id)

                __handleParkUpdate__(detailedPark.id)

                Alert.alert('Thanks for contributing!')
            } catch ({ message }) {

                Alert.alert(message)
            }
        }


        return <ParkDetails
            park={detailedPark}
            user={user}
            onVote={handleVote}
            onDeletePark={handleDeletePark}
            onUpdate={handleUpdate}
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


