import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Search, TopSearch, Results } from '../index'
// later move styles and this goes here => import styles from './styles'
import NavBar from '../NavBar'



export default function Home({ user }) {
    const [results, setResults] = useState(false)

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

    return (
        <View style={styles.container}>
            {!results && <Search onSubmit={handleSearch} />}
            {results && <TopSearch onSubmit={handleSearch} />}
            {results && <Results results={results} />}
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

