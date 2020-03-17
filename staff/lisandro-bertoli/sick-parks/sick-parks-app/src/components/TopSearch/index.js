import React from 'react'
import { View, TextInput, Image } from 'react-native'
// import { Button } from '../index'
import styles from './styles'
const searchIcon = require('../../../assets/icon-search.png')

export default function ({ currentQuery }) {
    const handleSubmit = () => {
        console.log('submit')
    }
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer} >
                <Image style={styles.queryIcon} source={searchIcon} />
            </View>
            <TextInput style={styles.input} defaultValue={currentQuery} onChangeText={(text) => setQuery(text)} onSubmitEditing={handleSubmit} returnKeyType="search" />
        </View>
    )
}