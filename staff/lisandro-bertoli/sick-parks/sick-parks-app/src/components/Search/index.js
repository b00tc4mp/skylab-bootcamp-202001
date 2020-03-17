import React, { useState, useEffect } from 'react'
import { View, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { Button } from '../index'
import styles from './styles'

const mainImg = require('../../../assets/home.jpg')
const leftImage = require('../../../assets/left-side.png')
const rightImage = require('../../../assets/right-side.png')


export default function ({ onSubmit }) {
    const [query, setQuery] = useState()

    useEffect(() => {
        onSubmit(query)
    }, [query])


    return (<>
        <ImageBackground source={mainImg}
            style={{ alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }} >
            <View style={{ flexDirection: 'row', flex: 1, width: '100%', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 }}>
                <TouchableOpacity style={styles.queryButton} onPress>
                    <Image style={styles.queryIcon} source={require('../../../assets/icon-search.png')} />
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder='Find a Park...' onChangeText={(text) => setQuery(text)} />
            </View>
        </ImageBackground >

        <View style={styles.optionsContainer}>
            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={rightImage}>
                <Button textStyle='bold' text='VERIFIED PARKS' type='filter' onPress={() => { setQuery('verified') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={rightImage}>
                <Button textStyle='bold' text='XL PARKS' type='filter' onPress={() => { setQuery('xl') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={leftImage}>
                <Button textStyle='bold' text='BEGGINER PARKS' type='filter' onPress={() => { setQuery('begginer') }} />
            </ImageBackground>

            <ImageBackground imageStyle={styles.image} style={styles.imageContainer} source={leftImage}>
                <Button textStyle='bold' text='LATEST PARKS' type='filter' onPress={() => { setQuery('latest') }} />
            </ImageBackground>
        </View>
    </>
    )
}
