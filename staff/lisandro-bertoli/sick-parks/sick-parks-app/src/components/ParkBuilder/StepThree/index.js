import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import Button from '../../Button'
import Feedback from '../../Feedback'
import MapViewContainer from '../../MapViewContainer'
import styles from './styles'



export default function StepThree({ features, park, onConfirmation }) {

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
                        <Text style={styles.text}>{features}</Text>
                    </View>

                </View>
                <View style={styles.mapContainer}>
                    <MapViewContainer parkLocation={park.location[0]} _markers={[park.location[0]]} style={styles.map} />
                </View>

                <Button
                    text='Confirm'
                    style={styles.nextButton}
                    textStyle={styles.button}
                    onPress={onConfirmation} />
            </ScrollView>

        </View>
    )
}
