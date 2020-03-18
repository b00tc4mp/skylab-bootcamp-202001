import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, TextInput, Image } from 'react-native'
import MapView from 'react-native-maps'
// import * as ImagePicker from 'expo-image-picker'
// import * as FileSystem from 'expo-file-system'
// import CameraRoll from "@react-native-community/cameraroll"
import ImagePicker from 'react-native-image-picker'


let place

function NewToilet({ coordinates, onSubmit }) {
    const [image, setImage] = useState()

    async function _pickImage() {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        await ImagePicker.showImagePicker(options, (response) => {
            const base64Value = response.data

            setImage(base64Value)
        })
    }



    // async function _pickImage() {
    //     let result = await ImagePicker.launchImageLibraryAsync(
    //         {
    //             mediaTypes: ImagePicker.MediaTypeOptions.All,
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1
    //         }
    //     )
    //     console.log(result)

    //     const fs = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })
    //     // console.log(fs)

    //     if (!result.cancelled) {
    //         const _uri = await CameraRoll.saveToCameraRoll(fs)
    //         // console.log(_uri)
    //         await setImage(result.uri)
    //         // await forceUpdate()
    //     }
    // }

    return (<>
        <ScrollView style={styles.container}>

            <Text style={styles.header}>New Toilet Post</Text>

            <View style={styles.locationContainer}>
                <Text style={styles.locationHeader}>Location:</Text>
                {coordinates.latitude && coordinates.longitude &&
                    <MapView style={styles.mapStyle}
                        region={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            latitudeDelta: coordinates.latitudeDelta,
                            longitudeDelta: coordinates.longitudeDelta,
                        }}>
                        <MapView.Marker coordinate={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude
                        }} />
                    </MapView>}
            </View>

            <View style={styles.uploadInfo}>
                <View style={styles.place}>
                    <Text style={styles.placeName}>Place: </Text>
                    <TextInput style={styles.placeInput} placeholder='insert the place here' onChangeText={(text) => place = text} />
                </View>

                <Text style={styles.options} onPress={() => _pickImage()}>Upload image</Text>
                {image && <Image source={{ uri: image }} />}
            </View>

            <TouchableOpacity >
                <Text style={styles.submitButton} onPress={() => onSubmit(place)}>💩 Submit! 💩</Text>
            </TouchableOpacity>
        </ScrollView>
    </>)
}

export default NewToilet