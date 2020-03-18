import React, { useState } from 'react'
import { View, TextInput, ImageBackground, Image } from 'react-native'
import { Button } from '../index'
import styles from './styles'

const mainImg = require('../../../assets/home.jpg')
const leftImage = require('../../../assets/left-side.png')
const rightImage = require('../../../assets/right-side.png')


export default function ({ extraData }) {
    const [query, setQuery] = useState()
    const { onSubmit } = extraData

    return (<>
        <ImageBackground source={mainImg}
            style={{ alignItems: 'center', flex: 1, height: '100%', width: '100%', justifyContent: 'flex-end' }} >
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 }}>
                <View style={styles.queryButton} >
                    <Image style={styles.queryIcon} source={require('../../../assets/icon-search.png')} />
                </View>
                <TextInput style={styles.input} placeholder='Find a Park...' onChangeText={(text) => setQuery(text)} onSubmitEditing={() => onSubmit(query)} returnKeyType="search" />
            </View>
        </ImageBackground >

        <View style={styles.optionsContainer}>
            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={rightImage}>
                <Button textStyle='bold' text='VERIFIED PARKS' type='filter' onPress={() => { onSubmit('verified') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={rightImage}>
                <Button textStyle='bold' text='XL PARKS' type='filter' onPress={() => { onSubmit('xl') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={leftImage}>
                <Button textStyle='bold' text='BEGGINER PARKS' type='filter' onPress={() => { onSubmit('begginer') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={leftImage}>
                <Button textStyle='bold' text='LATEST PARKS' type='filter' onPress={() => { onSubmit('latest') }} />
            </ImageBackground>
        </View>
    </>
    )
}
