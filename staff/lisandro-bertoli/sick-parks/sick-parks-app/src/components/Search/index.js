import React, { useState } from 'react'
import { View, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { Button } from '../index'
import styles from './styles'

const mainImg = require('../../../assets/home.jpg')
const filterImg = require('../../../assets/filter.png')


export default function Search({ onSubmit }) {
    const [query, setQuery] = useState()

    const handleOnPress = (q) => {
        onSubmit(q)
    }

    return (
        <View style={styles.container}>

            <ImageBackground source={mainImg}
                style={{ alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }} >
                <View style={{ flexDirection: 'row', flex: 1, width: '100%', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 }}>
                    <TouchableOpacity style={styles.queryButton}>
                        <Image style={styles.queryIcon} source={require('../../../assets/icon-search.png')} />
                    </TouchableOpacity>
                    <TextInput style={styles.input} placeholder='Find a Park...' onChangeText={(text) => setQuery(text)} />
                </View>
            </ImageBackground >

            <View style={styles.optionsContainer}>
                <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={filterImg}>
                    <Button textStyle='bold' text='VERIFIED PARKS' type='filter' onPress={() => { handleOnPress('verified') }} />
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={filterImg}>
                    <Button textStyle='bold' text='XL PARKS' type='filter' onPress={() => { handleOnPress('xl') }} />
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={filterImg}>
                    <Button textStyle='bold' text='BEGGINER PARKS' type='filter' onPress={() => { handleOnPress('begginer') }} />
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={filterImg}>
                    <Button textStyle='bold' text='LATEST PARKS' type='filter' onPress={() => { handleOnPress('latest') }} />
                </ImageBackground>
            </View>
        </View >

    )
}




