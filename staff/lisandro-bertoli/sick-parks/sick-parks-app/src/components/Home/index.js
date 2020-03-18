import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Search, TopSearch, Results, MapViewContainer } from '../index'
// later move styles and this goes here => import styles from './styles'
import NavBar from '../NavBar'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'



export default function Home({ user }) {
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

            console.log(location)
        }
    }


    const handleSearch = async (query) => {
        const result = [{
            name: 'Name',
            size: 'XL',
            resort: 'Bla',
            rating: 5,
            verified: false
        }]
        //this here => const result =  await searchParks(query)
        setResults(result)


    }

    const markers = [
        {
            coordinate: {
                latitude: 42.50551526821832,
                longitude: 1.593017578125

            },
            title: 'new marker',
            description: 'blablablba'

        }
    ]

    const myPlace = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: { name: 'TeST NAME' },
                geometry: {
                    type: 'Point',
                    coordinates: [64.165329, 48.844287],
                }
            }
        ]
    }

    return (
        <View style={styles.container}>

            <MapViewContainer markers={markers} myPlace={myPlace} initialRegion={location} />

            {/* {!results && <Search onSubmit={handleSearch} />}
            {results && <TopSearch onSubmit={handleSearch} />}
            {results && <Results results={results} />} */}
            <NavBar />
        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // justifyContent: 'center',
        width: '100%'
    }
})

