import React, { useState } from 'react'
import { View, TextInput, ImageBackground, Image } from 'react-native'
import Button from '../Button'
import styles from './styles'

const mainImg = require('../../../assets/home-1.jpg')
const leftImage = require('../../../assets/left-side.png')
const rightImage = require('../../../assets/right-side.png')


export default function ({ onSubmit }) {
    const [query, setQuery] = useState()

    return (<>
        <ImageBackground source={mainImg}
            style={styles.topImageContainer} imageStyle={styles.topImage} >
            <View style={styles.inputContainer}>
                <View style={styles.queryButton} >
                    <Image style={styles.queryIcon} source={require('../../../assets/icon-search.png')} />
                </View>
                <TextInput style={styles.input} placeholder='Find a Park...' onChangeText={(text) => setQuery(text)} onSubmitEditing={() => onSubmit(query)} returnKeyType="search" />
            </View>
        </ImageBackground >

        <View style={styles.optionsContainer}>
            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={rightImage}>
                <Button textStyle={styles.buttonText} text='VERIFIED PARKS' style={styles.filterButton} onPress={() => { onSubmit('verified') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={rightImage}>
                <Button textStyle={styles.buttonText} text='XL PARKS' style={styles.filterButton} onPress={() => { onSubmit('xl') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={leftImage}>
                <Button textStyle={styles.buttonText} text='BEGGINER PARKS' style={styles.filterButton} onPress={() => { onSubmit('begginer') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={leftImage}>
                <Button textStyle={styles.buttonText} text='LATEST PARKS' style={styles.filterButton} onPress={() => { onSubmit('latest') }} />
            </ImageBackground>
        </View>
    </>
    )
}
