import React, { useState } from 'react'
import { StyleSheet, ScrollView, Dimensions, View, Text, FlatList } from 'react-native'
import { Button, Feedback, MapViewContainer } from '../index'

const screenHeight = Dimensions.get('window').height
export default function StepThree({ navigation, route }) {
    const { features, park } = route.params

    let featuresList = Object.values(features).filter(item => item[0] !== undefined)


    for (let key in park) {
        if (park[key] === undefined) park[key] = 'N/A'

        if (key !== 'location') {


            park[key] = park[key].charAt(0).toUpperCase() + park[key].slice(1)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Park details:</Text>
                <View style={styles.details}>
                    <View style={styles.detailsCols}>
                        <Text styles={styles.fixedText}>Name: </Text>
                        <Text styles={styles.fixedText}>Size: </Text>
                        <Text styles={styles.fixedText}>Level: </Text>
                        <Text styles={styles.fixedText}>Flow: </Text>
                    </View>
                    <View style={styles.detailsCols}>
                        <Text styles={styles.variableText}>{park.name}</Text>
                        <Text styles={styles.variableText}>{park.size}</Text>
                        <Text styles={styles.variableText}>{park.level}</Text>
                        <Text styles={styles.variableText}>{park.flow}</Text>
                    </View>

                    <MapViewContainer _markers={[park.location[0]]} style={{ height: 150, width: 150 }} />
                </View>

            </ScrollView>

            <FlatList
                data={featuresList}
                renderItem={({ item }) => {
                    console.log(item[0])
                    return (<>
                        <Text>{item[0].description}</Text>
                        <Text>{item[0].size}</Text>
                    </>
                    )

                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: '#EDF4F9',
        paddingHorizontal: 10,
        paddingBottom: '30%',
        paddingTop: 10
    },
    header: {
        fontSize: 18,
        margin: 10,
        alignSelf: 'center'
    },
    details: {
        flex: 1,
        height: 200,
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