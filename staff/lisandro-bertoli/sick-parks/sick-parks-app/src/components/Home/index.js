import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'


import { Search, TopSearch, Results, ParkDetails } from '../index'
// later move styles and this goes here => import styles from './styles'
import { searchParks, retrievePark } from 'sick-parks-logic'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

const Stack = createStackNavigator()


export default function Home({ navigation }) {
    const [detailedPark, setDetailedPark] = useState()
    const [results, setResults] = useState(false)
    const [location, setLocation] = useState()
    const [currentQuery, setCurrentQuery] = useState()
    const [error, setError] = useState()



    // useEffect(() => {
    //     try {
    //         _getLocationAsync()
    //     } catch ({ message }) {
    //         setError({ message })
    //         console.log(message)

    //     }
    // }, [])


    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)

        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            setLocation({ location })
        }
    }



    function SearchScreen(props) {
        const { navigation } = props

        const handleSearch = async (query) => {
            try {
                setCurrentQuery(query)

                const result = await searchParks({ query })
                if (!results.length) setError('No results for this query')

                setResults(result)

                navigation.navigate('Results')
            } catch ({ message }) {
                setError(message)

                navigation.navigate('Results')
                console.log(error)
            }

        }

        return <Search onSubmit={handleSearch} />

    }

    function ResultsScreen(props) {
        const { navigation } = props

        const handleGoToDetails = async (id) => {
            try {
                const item = await retrievePark(id)
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

                const result = await searchParks({ query })
                setResults(result)

            } catch ({ message }) {
                setError(message)

                console.log(error)
            }

        }

        return <TopSearch onSubmit={handleSearch} query={currentQuery} />
    }

    function ParkDetailsScreen(props) {
        const { navigation } = props



        return <ParkDetails park={detailedPark} error={error} />

    }

    return (

        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }} mode='modal' headerMode='screen' initialRouteName='Search' >
            <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
            <Stack.Screen name="Results"
                component={ResultsScreen}
                options={{
                    headerStyle: { height: 80, backgroundColor: '#82A4B3' },
                    headerTitle: TopSearchHeader
                }} />
            <Stack.Screen name="ParkDetails" component={ParkDetailsScreen} />
        </Stack.Navigator >

    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#EDF4F9',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         width: '100%'
//     }
// })

