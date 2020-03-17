import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'


export default function ResultsItem({ name, size, resort, verified, rating }) {
    return (<>

        <TouchableOpacity style={styles.container} >
            <View style={styles.item}>
                <Image style={{ height: 50, width: 50 }} source={require('../../../assets/logo.png')} />
                <View style={{ flex: 1 }}>
                    <Text>Name</Text>
                    <Text>size</Text>
                    <Text>Resort</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <Text>Verified</Text>
                    <Text>Rating: 5</Text>
                </View>
            </View>
        </TouchableOpacity>
    </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#82A4B3',
        borderWidth: 3,
        backgroundColor: '#EDF4F9',
    }
})


