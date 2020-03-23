import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, Modal, Dimensions, TextInput, Picker, View, Text } from 'react-native'
import { Button, Feedback, MapViewContainer } from '../index'

const screenHeight = Dimensions.get('window').height
const TYPES = {
    COORDS: 'coordinates',
    SIZE: 'size',
    DESCRIPTION: 'description'
}

export default function StepOne({ navigation, route }) {
    const { park } = route.params
    const [error, setError] = useState()
    const [showModal, setShowModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState()
    const [stateRails, setRails] = useState([])
    const [stateBoxes, setBoxes] = useState([])
    const [stateKickers, setKickers] = useState([])
    const [statePipes, setPipes] = useState([])
    const [stateOthers, setOthers] = useState([])


    useEffect(() => {
        const { features: { rails = [], boxes = [], kickers = [], pipes = [], others = [] } } = route.params

        const railsArray = new Array(rails).fill({
            name: 'rail',
            location: {
                type: 'Point',
                coordinates: {},

            },
            size: 's',
            description: ''
        })

        setRails(railsArray)

        const boxesArray = new Array(boxes).fill({
            name: 'box',
            location: {
                type: 'Point',
                coordinates: {},

            },
            size: 's',
            description: ''
        })

        setBoxes(boxesArray)

        const kickersArray = new Array(kickers).fill({
            name: 'kicker',
            location: {
                type: 'Point',
                coordinates: {},

            },
            size: 's',
            description: ''
        })

        setKickers(kickersArray)

        const pipesArray = new Array(pipes).fill({
            name: 'pipe',
            location: {
                type: 'Point',
                coordinates: {},

            },
            size: 's',
            description: ''
        })

        setPipes(pipesArray)

        const othersArray = new Array(others).fill({
            name: 'transition',
            location: {
                type: 'Point',
                coordinates: {},

            },
            size: 's',
            description: ''
        })

        setOthers(othersArray)



    }, [])

    const handleEachValue = (type, value, index) => {
        switch (true) {
            case index[0] === 'rail':
                const updatedRails = stateRails.map((e, i) => {

                    if (i === index[1]) return { ...e, [type]: value }
                    else return e
                })

                setRails(updatedRails)
                break
            case index[0] === 'box':
                const updatedBoxes = stateBoxes.map((e, i) => {

                    if (i === index[1]) return { ...e, [type]: value }
                    else return e
                })
                setBoxes(updatedBoxes)
                break
            case index[0] === 'kicker':
                const updatedKickers = stateKickers.map((e, i) => {

                    if (i === index[1]) return { ...e, [type]: value }
                    else return e
                })
                setKickers(updatedKickers)
                break
            case index[0] === 'pipe':
                const updatedPipes = statePipes.map((e, i) => {

                    if (i === index[1]) return { ...e, [type]: value }
                    else return e
                })
                setPipes(updatedPipes)
                break
            case index[0] === 'other':
                const updatedOthers = stateOthers.map((e, i) => {

                    if (i === index[1]) return { ...e, [type]: value }
                    else return e
                })
                setOthers(updatedOthers)
                break

        }

        if (type === TYPES.COORDS) setTimeout(() => {
            setShowModal(false)
        }, 500)

    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                presentationStyle='formSheet'
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalHeader}>
                    <Button onPress={() => setShowModal(false)} style={{ flex: 1 }} text='Cancel' textStyle={{ fontSize: 16, color: 'red' }} />
                    <Text style={styles.modalText}>Pick a location</Text>
                </View>
                <MapViewContainer style={styles.mapStyle} handleNewMarker={(coordinates) => {
                    handleEachValue(TYPES.COORDS, coordinates, currentIndex)
                }} />
            </Modal>
            <ScrollView>
                {stateRails && stateRails.map((rail, index) => {
                    return (
                        <View key={index.toString()} style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Rail {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker
                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['rail', index])}
                            >
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput
                                    onFocus={() => setError(null)}
                                    selectionColor='#EDF4F9'
                                    placeholder='Eg: Gnarly kinked rail'
                                    style={styles.textInput}
                                    onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['rail', index])}
                                />
                            </View>
                            <Button
                                text='Set Location'
                                textStyle='text'
                                style={{
                                    backgroundColor: '#EFEBDA',
                                    flex: 0.3,
                                    alignSelf: 'flex-start',
                                    borderRadius: 5,
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setCurrentIndex(['rail', index]);
                                    setShowModal(true)
                                }}
                            />
                        </View>
                    )
                })}
                {stateBoxes && stateBoxes.map((box, index) => {
                    return (
                        <View key={index.toString()} style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Box {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker
                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['box', index])}
                            >
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput
                                    onFocus={() => setError(null)}
                                    selectionColor='#EDF4F9'
                                    placeholder='Eg: mellow flat rail'
                                    style={styles.textInput}
                                    onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['box', index])}
                                />
                            </View>
                            <Button
                                text='Set Location'
                                textStyle='text'
                                style={{
                                    backgroundColor: '#EFEBDA',
                                    flex: 0.3,
                                    alignSelf: 'flex-start',
                                    borderRadius: 5,
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setCurrentIndex(['box', index]);
                                    setShowModal(true)
                                }}
                            />
                        </View>
                    )
                })}
                {stateKickers && stateKickers.map((kicker, index) => {
                    return (
                        <View key={index.toString()} style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Kicker {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker
                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['kicker', index])}
                            >
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput
                                    onFocus={() => setError(null)}
                                    selectionColor='#EDF4F9'
                                    placeholder='Eg: 12ft step-up'
                                    style={styles.textInput}
                                    onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['kicker', index])}
                                />
                            </View>
                            <Button
                                text='Set Location'
                                textStyle='text'
                                style={{
                                    backgroundColor: '#EFEBDA',
                                    flex: 0.3,
                                    alignSelf: 'flex-start',
                                    borderRadius: 5,
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setCurrentIndex(['kicker', index]);
                                    setShowModal(true)
                                }}
                            />
                        </View>
                    )
                })}
                {statePipes && statePipes.map((pipes, index) => {
                    return (
                        <View key={index.toString()} style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Pipe {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker
                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['pipe', index])}
                            >
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput
                                    onFocus={() => setError(null)}
                                    selectionColor='#EDF4F9'
                                    placeholder='Eg: minipipe'
                                    style={styles.textInput}
                                    onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['pipe', index])}
                                />
                            </View>
                            <Button
                                text='Set Location'
                                textStyle='text'
                                style={{
                                    backgroundColor: '#EFEBDA',
                                    flex: 0.3,
                                    alignSelf: 'flex-start',
                                    borderRadius: 5,
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setCurrentIndex(['pipe', index]);
                                    setShowModal(true)
                                }}
                            />
                        </View>
                    )
                })}
                {stateOthers && stateOthers.map((other, index) => {
                    return (
                        <View key={index.toString()} style={{ height: 220, justifyContent: 'space-around' }}>
                            <Text style={{ alignSelf: 'center' }}>Other {index + 1}:</Text>
                            {error && <Feedback level='warn' message={error} />}
                            <Text >Size: </Text>

                            <Picker
                                style={{ height: 40, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['other', index])}
                            >
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '10%' }}>
                                <Text style={{ alignSelf: 'center' }}>Description:</Text>
                                <TextInput
                                    onFocus={() => setError(null)}
                                    selectionColor='#EDF4F9'
                                    placeholder='Eg: spine'
                                    style={styles.textInput}
                                    onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['other', index])}
                                />
                            </View>
                            <Button
                                text='Set Location'
                                textStyle='text'
                                style={{
                                    backgroundColor: '#EFEBDA',
                                    flex: 0.3,
                                    alignSelf: 'flex-start',
                                    borderRadius: 5,
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setCurrentIndex(['other', index]);
                                    setShowModal(true)
                                }}
                            />
                        </View>
                    )
                })}
                <Button style={styles.mainButton} text='Next' textStyle={{ color: '#82A4B3' }}
                    onPress={() => navigation.navigate(
                        'Summary',
                        { features: { stateRails, stateBoxes, stateKickers, statePipes, stateOthers }, park })}
                />
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: '#EDF4F9',
        paddingHorizontal: 10,
        paddingBottom: '50%'
    },
    textContainer: {


    },
    modalHeader: {
        flex: 0.1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#EDF4F9',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    mapStyle: {

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.855,
    },

    modalText: {
        color: '#82A4B3',
        fontSize: 16
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
    },

    mainButton: {
        height: 40,
        backgroundColor: '#EFEBDA',
        width: 250,
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }

})