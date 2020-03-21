import React, { useState } from 'react'
import { StyleSheet, ScrollView, TouchableHighlight, KeyboardAvoidingView, Modal, Dimensions, TextInput, Picker, TouchableOpacity, View, Text } from 'react-native'
import { Button, Feedback, RadioButton, MapViewContainer } from '../index'


let screenHeight = Dimensions.get('window').height

export default function StepOne({ navigation, route }) {
    const [error, setError] = useState()
    const [showModal, setShowModal] = useState(false)
    const [featuresDetails, setFeaturesDetails] = useState()
    const [currentRail, setCurrentRail] = useState()
    const { park, features: { rails, boxes, kickers, pipes, others } } = route.params

    const featuresNeeded = rails || boxes || kickers || pipes || others
    if (!featuresNeeded) navigation.navigate('StepThree')

    let railsNeeded = rails && new Array(rails).fill({})
    let boxesNeeded = boxes && Array(boxes).fill({})
    let kickersNeeded = kickers && new Array(kickers).fill({})
    let pipesNeeded = pipes && new Array(pipes).fill({})
    let othersNeeded = others && new Array(others).fill({})


    let _rails = []
    let _boxes = []
    let _kickers = []
    let _pipes = []
    let _others = []

    const handleNewMarker = (coordinates) => {
        console.log(_rails[currentRail])
        // console.log(coordinates)
        _rails[currentRail] = { ..._rails[currentRail] }
        _rails[currentRail].location = coordinates
        console.log(_rails)
    }

    const handleSizeChange = (target, index, value) => {

    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <MapViewContainer getMarkers={handleNewMarker} />
                <TouchableHighlight
                    onPress={() => {
                        setShowModal(false);
                    }}>
                    <Text>Hide Modal</Text>
                </TouchableHighlight>
            </Modal>
            <ScrollView>
                {railsNeeded && railsNeeded.map((rail, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker

                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={value => {
                                    _rails[index] = { ...rails[index] }
                                    _rails[index].size = value
                                    console.log(_rails)

                                }
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Gnarly kinked rail' style={styles.textInput} onChangeText={(text) => { _rails[index] = { ..._rails[index] }; _rails[index].description = text; console.log(_rails) }} />
                            </View>
                            <Button text='Set Location' textStyle='text' style={{
                                backgroundColor: '#EFEBDA',
                                flex: 0.3,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                justifyContent: 'center'
                            }} onPress={() => { setCurrentRail(index); setShowModal(true) }} />
                        </View>
                    )
                })}
                {boxesNeeded && boxesNeeded.map((box, index) => {
                    return (
                        <View style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker

                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={value => {
                                    _rails[index] = {}
                                    _rails[index].size = value
                                    console.log(_rails)
                                }
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Gnarly kinked rail' style={styles.textInput} onChangeText={(text) => railsDetails.index.description = text} />
                            </View>
                            <Button text='Set Location' textStyle='text' style={{
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
                        <View style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker

                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={value => {

                                }
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Gnarly kinked rail' style={styles.textInput} onChangeText={(text) => railsDetails.index.description = text} />
                            </View>
                            <Button text='Set Location' textStyle='text' style={{
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
                        <View style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker

                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={value => {

                                }
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Gnarly kinked rail' style={styles.textInput} onChangeText={(text) => railsDetails.index.description = text} />
                            </View>
                            <Button text='Set Location' textStyle='text' style={{
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
                        <View style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker

                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={value => {

                                }
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Gnarly kinked rail' style={styles.textInput} onChangeText={(text) => railsDetails.index.description = text} />
                            </View>
                            <Button text='Set Location' textStyle='text' style={{
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
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 0.8,
        height: 30


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