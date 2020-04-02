import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import Button from '../../Button'
import MapViewContainer from '../../MapViewContainer'
import styles from './styles'



export default function StepThree({ route: { params: { features, park, onNewPark } } }) {

    let numberOfFeatures = 0
    for (let key in features) numberOfFeatures += features[key].length

    for (let key in park) {
        if (park[key] === undefined) park[key] = 'N/A'

        if (key !== 'location') {
            park[key] = park[key].charAt(0).toUpperCase() + park[key].slice(1)
        }
    }

    const handleParkSubmission = () => {
        let _features = []
        Object.values(features).forEach(value => value.forEach(element => _features.push(element)))
        const { location } = park


        park.location = {
            type: 'Point',
            coordinates: [location[0].longitude, location[0].latitude]
        }

        onNewPark({ features: _features, park })
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <View style={styles.details}>
                    <View style={styles.detailsCols}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.label}>Size: </Text>
                        <Text style={styles.label}>Level: </Text>
                        <Text style={styles.label}>Flow: </Text>
                        <Text style={styles.label}>Features: </Text>

                    </View>
                    <View style={styles.detailsCols}>
                        <Text style={styles.text}>{park.name}</Text>
                        <Text style={styles.text}>{park.size}</Text>
                        <Text style={styles.text}>{park.level}</Text>
                        <Text style={styles.text}>{park.flow}</Text>
                        <Text style={styles.text}>{numberOfFeatures}</Text>
                    </View>

                </View>
                <View style={styles.mapContainer}>
                    <MapViewContainer parkLocation={park.location[0]} _markers={[park.location[0]]} style={styles.map} />
                </View>

                <Button
                    text='Confirm'
                    style={styles.nextButton}
                    textStyle={styles.button}
                    onPress={handleParkSubmission} />
            </ScrollView>

        </View>
    )
}
