import React, { useState } from 'react'
import { StyleSheet, ScrollView, Dimensions, View, Text, Alert } from 'react-native'
import Button from '../Button'
import MapViewContainer from '../MapViewContainer'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


export default function StepThree({ navigation, route }) {
    const { features, park, onNewPark } = route.params
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

        _features.forEach(feature => {
            if (feature.coordinates) {
                feature.location = {
                    type: 'Point',
                    coordinates: [feature.coordinates.longitude, feature.coordinates.latitude],
                }
                delete feature.coordinates
            }
        })

        park.location = {
            type: 'Point',
            coordinates: [location[0].longitude, location[0].latitude]
        }

        onNewPark({ features: _features, park })

        Alert.alert('Park created!')
        const parent = navigation.dangerouslyGetParent()


        parent.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1, width: screenWidth * 0.9 }}>
                <View style={styles.details}>
                    <View style={styles.detailsCols}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.label}>Size: </Text>
                        <Text style={styles.label}>Level: </Text>
                        <Text style={styles.label}>Flow: </Text>
                        <Text style={styles.label}>Features: </Text>

                    </View>
                    <View style={styles.detailsCols}>
                        <Text>{park.name}</Text>
                        <Text>{park.size}</Text>
                        <Text>{park.level}</Text>
                        <Text>{park.flow}</Text>
                        <Text>{numberOfFeatures}</Text>
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


const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: '#EDF4F9',
        paddingBottom: '30%',
        width: '90%',
        paddingTop: 10,
        alignItems: "center",
        alignSelf: 'center'

    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 18,
        margin: 10,
        alignSelf: 'center'
    },
    mapContainer: {
        flex: 0.5,
        height: 100,
        width: '100%',
        alignSelf: 'center',
        paddingBottom: 10,
    },
    details: {
        flex: 0.5,

        height: '35%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    detailsCols: {
        justifyContent: 'space-around'
    },
    lineRight: {
        borderWidth: 5,
        borderStyle: 'solid',
        borderBottomColor: 'red'
    },
    nextButton: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: '#EFEBDA',
        padding: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        color: '#82A4B3',
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',

    }

})

// Object {
//     "flow": "Fr",
//         "level": "begginer",
//             "location": Array[
//                 Object {
//         "coordinate": Object {
//             "latitude": 41.756695907009345,
//                 "longitude": -0.45843810400002055,
//         },
//     },
//     ],
//     "name": "Ff",
//         "resort": "Gg",
//             "size": "m",
//   }
// Object {
//     "stateBoxes": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.39340768355141,
//                     "longitude": -0.4237506053332365,
//           },
//         },
//         "description": "Bbv",
//             "size": "l",
//       },
//     ],
//     "stateKickers": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.847198574442224,
//                     "longitude": -1.2215630746666237,
//           },
//         },
//         "description": "Bhbhh",
//             "size": "xl",
//       },
//     ],
//     "stateOthers": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.76963268522253,
//                     "longitude": -0.4410943546666285,
//           },
//         },
//         "description": "Jujuu",
//             "size": "xl",
//       },
//     ],
//     "statePipes": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.76963268522253,
//                     "longitude": -0.6492193466666204,
//           },
//         },
//         "description": "Jj",
//             "size": "xl",
//       },
//     ],
//     "stateRails": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.471427149376034,
//                     "longitude": -1.1695318266666512,
//           },
//         },
//         "description": "Bbvvv",
//             "size": "xl",
//       },
//     ],
// }