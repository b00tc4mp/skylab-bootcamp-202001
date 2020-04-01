import React, { useState, useEffect } from 'react'
import { ScrollView, KeyboardAvoidingView, Modal, TextInput, Picker, View, Text } from 'react-native'
import Button from '../../Button'
import Feedback from '../../Feedback'
import MapViewContainer from '../../MapViewContainer'
import styles from './styles'

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
            name: 'other',
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


