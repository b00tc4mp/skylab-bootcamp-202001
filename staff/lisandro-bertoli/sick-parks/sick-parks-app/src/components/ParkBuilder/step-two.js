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
            size: 's',
            description: ''
        })

        setRails(railsArray)

        const boxesArray = new Array(boxes).fill({
            name: 'box',
            size: 's',
            description: ''
        })

        setBoxes(boxesArray)

        const kickersArray = new Array(kickers).fill({
            name: 'kicker',
            size: 's',
            description: ''
        })

        setKickers(kickersArray)

        const pipesArray = new Array(pipes).fill({
            name: 'pipe',
            size: 's',
            description: ''
        })

        setPipes(pipesArray)

        const othersArray = new Array(others).fill({
            name: 'transition',
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
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView scrollEnabled={true}>
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={showModal}
                        presentationStyle='formSheet'
                    >
                        <View style={styles.modalHeader}>
                            <Button onPress={() => setShowModal(false)} style={{ flex: 1 }} text='Cancel' textStyle={{ fontSize: 16, color: 'red' }} />
                            <Text style={styles.modalText}>Pick a location</Text>
                        </View>
                        <MapViewContainer style={styles.mapStyle} handleNewMarker={(coordinates) => {
                            handleEachValue(TYPES.COORDS, coordinates, currentIndex)
                        }} />
                    </Modal>
                    {stateRails && stateRails.map((rail, index) => {
                        return (
                            <View key={index.toString()} style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Rail {index + 1}:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label} >Size: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['rail', index])}
                                    >
                                        <Picker.Item label="Small" value="s" />
                                        <Picker.Item label="Medium" value="m" />
                                        <Picker.Item label="Large" value="l" />
                                        <Picker.Item label="XL" value="xl" />
                                    </Picker>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <Text style={styles.label}>Description:</Text>
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
                                    style={styles.buttonContainer}
                                    textStyle={styles.button}
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
                            <View key={index.toString()} style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Box {index + 1}:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label} >Size: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['box', index])}
                                    >
                                        <Picker.Item label="Small" value="s" />
                                        <Picker.Item label="Medium" value="m" />
                                        <Picker.Item label="Large" value="l" />
                                        <Picker.Item label="XL" value="xl" />
                                    </Picker>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <Text style={styles.label}>Description:</Text>
                                    <TextInput
                                        onFocus={() => setError(null)}
                                        selectionColor='#EDF4F9'
                                        placeholder='Eg: mellow box'
                                        style={styles.textInput}
                                        onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['box', index])}
                                    />
                                </View>
                                <Button
                                    text='Set Location'
                                    style={styles.buttonContainer}
                                    textStyle={styles.button}
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
                            <View key={index.toString()} style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Kicker {index + 1}:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label} >Size: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['kicker', index])}
                                    >
                                        <Picker.Item label="Small" value="s" />
                                        <Picker.Item label="Medium" value="m" />
                                        <Picker.Item label="Large" value="l" />
                                        <Picker.Item label="XL" value="xl" />
                                    </Picker>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <Text style={styles.label}>Description:</Text>
                                    <TextInput
                                        onFocus={() => setError(null)}
                                        selectionColor='#EDF4F9'
                                        placeholder='Eg: 10ft step-up'
                                        style={styles.textInput}
                                        onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['kicker', index])}
                                    />
                                </View>
                                <Button
                                    text='Set Location'
                                    style={styles.buttonContainer}
                                    textStyle={styles.button}
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
                            <View key={index.toString()} style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Pipe {index + 1}:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label} >Size: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['pipe', index])}
                                    >
                                        <Picker.Item label="Small" value="s" />
                                        <Picker.Item label="Medium" value="m" />
                                        <Picker.Item label="Large" value="l" />
                                        <Picker.Item label="XL" value="xl" />
                                    </Picker>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <Text style={styles.label}>Description:</Text>
                                    <TextInput
                                        onFocus={() => setError(null)}
                                        selectionColor='#EDF4F9'
                                        placeholder='Eg: Super pipe'
                                        style={styles.textInput}
                                        onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['pipe', index])}
                                    />
                                </View>
                                <Button
                                    text='Set Location'
                                    style={styles.buttonContainer}
                                    textStyle={styles.button}
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
                            <View key={index.toString()} style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Other {index + 1}:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label} >Size: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => handleEachValue(TYPES.SIZE, value, ['other', index])}
                                    >
                                        <Picker.Item label="Small" value="s" />
                                        <Picker.Item label="Medium" value="m" />
                                        <Picker.Item label="Large" value="l" />
                                        <Picker.Item label="XL" value="xl" />
                                    </Picker>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <Text style={styles.label}>Description:</Text>
                                    <TextInput
                                        onFocus={() => setError(null)}
                                        selectionColor='#EDF4F9'
                                        placeholder='Eg: Wallride'
                                        style={styles.textInput}
                                        onChangeText={(text) => handleEachValue(TYPES.DESCRIPTION, text, ['other', index])}
                                    />
                                </View>
                                <Button
                                    text='Set Location'
                                    style={styles.buttonContainer}
                                    textStyle={styles.button}
                                    onPress={() => {
                                        setCurrentIndex(['other', index]);
                                        setShowModal(true)
                                    }}
                                />
                            </View>
                        )
                    })}
                    <Button style={styles.nextButton} text='Next' textStyle={styles.button}
                        onPress={() => navigation.navigate(
                            'Summary',
                            { features: { stateRails, stateBoxes, stateKickers, statePipes, stateOthers }, park })}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-around',

        paddingHorizontal: 10,
        paddingBottom: 10
    },
    pickerContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },
    picker: {
        height: 40,
        color: '#EFEBDA',
        width: '60%',
        backgroundColor: '#82A4B3',
        borderColor: '#EFEBDA',
        borderWidth: 2
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
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        flex: 1,
    },

    itemContainer: {
        flex: 1,
        marginVertical: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#EFEBDA',
    },
    itemLabel: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    textInput: {
        height: '170%',
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2

    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        width: '50%',
        alignSelf: 'center'

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