import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Button, Search } from '../index'
import styles from './styles'
import NavBar from '../NavBar'




export default function Home({ onSubmit }) {
    const [view, setView] = useState()
    const [results, setResults] = useState(false)

    const handleSearch = (query) => {
        setResults(query)
        console.log(results)

    }

    return (
        <View style={styles.container}>
            {!results && <Search onSubmit={handleSearch} />}
            {results && <Results results={results} />}
            <NavBar />
        </View >
    )
}




