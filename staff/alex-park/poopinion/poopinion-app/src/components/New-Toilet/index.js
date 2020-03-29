import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, TextInput, Image, Button } from 'react-native'
import MapView from 'react-native-maps'
import * as ImagePicker from 'expo-image-picker'

export default class NewToilet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            place: undefined,
            wheelchair: false
        }
    }

    render() {
        let { image, wheelchair } = this.state

        return (<>
            <ScrollView style={styles.container}>

                <Text style={styles.header}>New Toilet Post</Text>

                <View style={styles.locationContainer}>
                    <Text style={styles.locationHeader}>Location:</Text>
                    {this.props.coordinates.latitude && this.props.coordinates.longitude &&
                        <MapView style={styles.mapStyle}
                            region={{
                                latitude: this.props.coordinates.latitude,
                                longitude: this.props.coordinates.longitude,
                                latitudeDelta: this.props.coordinates.latitudeDelta,
                                longitudeDelta: this.props.coordinates.longitudeDelta,
                            }}>
                            <MapView.Marker coordinate={{
                                latitude: this.props.coordinates.latitude,
                                longitude: this.props.coordinates.longitude
                            }} />
                        </MapView>}
                </View>

                <View style={styles.uploadInfo}>
                    <View style={styles.place}>
                        <Text style={styles.placeName}>Place: </Text>
                        <TextInput style={styles.placeInput} placeholder='insert the place here' onChangeText={(text) => this.setState({ place: text.trim() })} />
                    </View>
                    <View style={styles.options}>
                        <Button title='Upload image' onPress={this._pickImage} />
                    </View>

                    {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}

                    <View style={styles.disabledInfo}>
                        {wheelchair ? (<TouchableOpacity onPress={() => this.setState({ wheelchair: !wheelchair })}><Image style={styles.disabledLogo} source={require('../../../assets/wheelchair.png')} /></TouchableOpacity>)
                            :
                            (<TouchableOpacity onPress={() => this.setState({ wheelchair: !wheelchair })}><Image style={styles.disabledLogoOpacity} source={require('../../../assets/wheelchair.png')} /></TouchableOpacity>)}
                        <Text style={styles.disabledTextContent}>Disabled toilet availability</Text>
                    </View>
                </View>

                <TouchableOpacity >
                    <Text style={styles.submitButton} onPress={this._onSubmit}>💩 Submit! 💩</Text>
                </TouchableOpacity>
            </ScrollView>
        </>)
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    _onSubmit = () => {
        this.props.onSubmit(this.state.place, this.state.image)
    };
}