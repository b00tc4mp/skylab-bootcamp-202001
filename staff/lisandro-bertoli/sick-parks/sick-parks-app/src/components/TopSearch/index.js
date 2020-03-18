import React, { useState } from 'react'
import { View, TextInput, Image } from 'react-native'
// import { Button } from '../index'
import styles from './styles'
const searchIcon = require('../../../assets/icon-search.png')

export default function ({ extraData }) {
    const [query, setQuery] = useState()
    const { onSubmit, currentQuery } = extraData
    const filters = []
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer} >
                <Image style={styles.queryIcon} source={searchIcon} />
            </View>
            <TextInput style={styles.input} defaultValue={currentQuery} onChangeText={(text) => setQuery(text)} onSubmitEditing={() => onSubmit(query)} returnKeyType="search" />

        </View>
    )
}