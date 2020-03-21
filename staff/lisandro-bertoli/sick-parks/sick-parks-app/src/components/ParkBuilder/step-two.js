import React, { useState } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, TextInput, Picker, Keyboard, View, Text } from 'react-native'
import { Button, Feedback, RadioButton } from '../index'
import { RotationGestureHandler } from 'react-native-gesture-handler'

let screenHeight = Dimensions.get('window').height

export default function StepOne({ navigation, route }) {
    const [error, setError] = useState()
    const { park, features: { rails, boxes, kickers, pipes, others } } = route.params

    const featuresNeeded = rails || boxes || kickers || pipes || others
    if (!featuresNeeded) navigation.navigate('StepThree')

    const railsNeeded = rails && new Array(rails).fill(0)
    const boxesNeeded = boxes && Array(boxes).fill(0)
    const kickersNeeded = kickers && new Array(kickers).fill(0)
    const pipesNeeded = pipes && new Array(pipes).fill(0)
    const othersNeeded = others && new Array(others).fill(0)

    const railsDetails = {

    }

    return (
        <View style={styles.container}>

            <ScrollView>
                {railsNeeded && railsNeeded.map((rail, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Level:</Text>
                            <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Gnarly kinked rail' style={styles.textInput} onChangeText={(text) => railsDetails.rail1.description = text} />
                            </View>
                            <Button text='Set Location' style={{
                                backgroundColor: '#EFEBDA',
                                flex: 0.3,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                justifyContent: 'center'
                            }} />
                        </View>
                    )
                })}
                {boxesNeeded && boxesNeeded.map((box, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-between' }}>
                            <Text>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text style={{ alignSelf: 'center' }}>Level</Text>
                            <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Grindelwald' style={styles.textInput} onChangeText={(text) => setResort(text)} />
                            </View>
                            <Button text='Set Location' style={{
                                backgroundColor: '#EFEBDA',
                                flex: 0.3,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                justifyContent: 'center'
                            }} />
                        </View>
                    )
                })}
                {kickersNeeded && kickersNeeded.map((kicker, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-between' }}>
                            <Text>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text style={{ alignSelf: 'center' }}>Level</Text>
                            <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Grindelwald' style={styles.textInput} onChangeText={(text) => setResort(text)} />
                            </View>
                            <Button text='Set Location' style={{
                                backgroundColor: '#EFEBDA',
                                flex: 0.3,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                justifyContent: 'center'
                            }} />
                        </View>
                    )
                })}
                {pipesNeeded && pipesNeeded.map((pipes, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-between' }}>
                            <Text>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text style={{ alignSelf: 'center' }}>Level</Text>
                            <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Grindelwald' style={styles.textInput} onChangeText={(text) => setResort(text)} />
                            </View>
                            <Button text='Set Location' style={{
                                backgroundColor: '#EFEBDA',
                                flex: 0.3,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                justifyContent: 'center'
                            }} />
                        </View>
                    )
                })}
                {othersNeeded && othersNeeded.map((other, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-between' }}>
                            <Text>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text style={{ alignSelf: 'center' }}>Level</Text>
                            <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                                <View style={{ height: '100%', justifyContent: "space-between" }} >
                                    <Text>Begginer</Text>
                                    <RadioButton style={{ alignSelf: 'center' }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Grindelwald' style={styles.textInput} onChangeText={(text) => setResort(text)} />
                            </View>
                            <Button text='Set Location' style={{
                                backgroundColor: '#EFEBDA',
                                flex: 0.3,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                justifyContent: 'center'
                            }} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        height: screenHeight,

        backgroundColor: '#EDF4F9',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
        paddingHorizontal: 10,
        // marginTop: '1%'
        paddingBottom: '30%'
    },
    textContainer: {


    },
    textInput: {
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        borderRadius: 5,
        paddingHorizontal: 10

    },



    button: {
        height: 40,
        backgroundColor: '#EFEBDA',
        width: 250,
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent: 'center',

    }

})