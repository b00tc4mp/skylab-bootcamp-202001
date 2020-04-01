import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native'
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
        } catch ({ message }) {
            Alert.alert(message)
            setError(message)
        }
    }

    const search = async (query, navigation) => {
        try {
            setCurrentQuery(query)
            const results = await searchParks(query, [location.longitude, location.latitude])

            if (!results.length) setError(`No ${query} parks found`)
            else setError(null)

            setResults(results)

            navigation && navigation.navigate('Results')
        } catch ({ message }) {
            setError(message)

            navigation.navigate('Results')

        }
    }

    const goToDetails = async (id, navigation) => {
        try {
            const item = await retrievePark(id)
            setDetailedPark(item)

            navigation.navigate('ParkDetails')
        } catch (error) {
            if (error.name === 'NotFoundError') Alert.alert(error.message)
            else setError(error.message)
        }
    }

    const handleOnDelete = async (navigation) => {
        try {

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                }))


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

    const handleParkVote = async (vote) => {
        if (user === 'guest') return Alert.alert('This action needs you to be registered')

        try {
            await votePark(user.id, detailedPark.id, vote)

            __handleParkUpdate__(detailedPark.id)
        } catch ({ message }) {
            Alert.alert('This action cannot be performed twice by the same user')
        }
    }

    const submitComment = async (body) => {
        if (user === 'guest') return Alert.alert('This action needs you to be registered')

        try {
            await publishComment(user.id, detailedPark.id, body)

            __handleParkUpdate__(detailedPark.id)
        } catch ({ message }) {
            Alert.alert(message)
        }
    }

    const handleParkContribution = async (action) => {
        if (user === 'guest') return Alert.alert('This action needs you to be registered')

        try {
            if (action === 'unreal' || action === 'duplicate') await reportPark(user.id, detailedPark.id, action)

            else if (action === 'approve') await approvePark(user.id, detailedPark.id)

            __handleParkUpdate__(detailedPark.id)

            Alert.alert('Thanks for contributing!')
        } catch ({ message }) {

            Alert.alert(message)
        }
    }

    function SearchScreen({ navigation }) {
        const handleOnSubmit = (query) => search(query, navigation)

        return <Search onSubmit={handleOnSubmit} />
    }

    function TopSearchHeader() {
        const handleOnSubmit = (query) => search(query)

        return <TopSearch onSubmit={handleOnSubmit} query={currentQuery} />
    }

    function ResultsScreen({ navigation }) {
        const handleGoToDetails = (id) => goToDetails(id, navigation)

        return <Results results={results} error={error} onToDetails={handleGoToDetails} />
    }

    function ParkDetailsScreen({ navigation }) {
        const onDelete = () => handleOnDelete(navigation)

        const onParkUpdate = update => handleUpdate(update)

        const handleVote = vote => handleParkVote(vote)

        const handleCommentSubmit = body => submitComment(body)

        const handleContribution = action => handleParkContribution(action)

        return <ParkDetails
            park={detailedPark}
            user={user}
            onVote={handleVote}
            onDeletePark={onDelete}
            onUpdate={onParkUpdate}
            onCommentSubmit={handleCommentSubmit}
            onContribution={handleContribution}
            goBack={navigation.goBack}
            error={error} />

    }

    return (
        <Stack.Navigator mode='modal' headerMode='screen' initialRouteName='Search'
            screenOptions={{
                headerBackTitleVisible: false, headerStyle: { backgroundColor: '#82A4B3' }, headerTitleStyle: { fontFamily: 'montserrat-semi' }, headerTintColor: '#EFEBDA'
            }}>
            <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ headerTitle: TopSearchHeader }} />
            <Stack.Screen name="ParkDetails" component={ParkDetailsScreen} />
        </Stack.Navigator >

    )
}


