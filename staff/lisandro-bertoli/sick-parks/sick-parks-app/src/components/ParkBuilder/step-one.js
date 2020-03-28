import React, { useState } from 'react'
import { StyleSheet, ScrollView, Modal, KeyboardAvoidingView, Dimensions, TextInput, Picker, View, Text } from 'react-native'
import Button from '../Button'
import Feedback from '../Feedback'
import MapViewContainer from '../MapViewContainer'
import MapView, { Marker } from 'react-native-maps';
// import styles from '../Button/styles';


export default function StepOne({ navigation, error: _error }) {
    const [name, setName] = useState()
    const [resort, setResort] = useState()
    const [showModal, setShowModal] = useState(false)
    const [flow, setFlow] = useState()
    const [location, setLocation] = useState()
    const [size, setSize] = useState('m')
    const [level, setLevel] = useState('begginer')
    const [rails, setRails] = useState(0)
    const [kickers, setKickers] = useState(0)
    const [boxes, setBoxes] = useState(0)
    const [others, setOthers] = useState(0)
    const [pipes, setPipes] = useState(0)
    const [error, setError] = useState(_error)


    const handleNextStep = () => {
        switch (true) {
            case name === undefined || name.trim() === '':
                setError('Name is empty')
                break
            case resort === undefined || resort.trim() === '':
                setError('Resort is empty')
                break
            case location === undefined:
                setError('Location is required')
                break
            default:
                navigation.navigate('Featues info', { features: { rails, boxes, kickers, pipes, others }, park: { name, resort, flow, size, level, location } })
        }
    }

    return (
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView scrollEnabled={true}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Name:</Text>
                            <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Oberjoch Park' style={styles.textInput} onChangeText={(text) => setName(text)} />
                        </View>

                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Resort:</Text>

                            <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Grindelwald' style={styles.textInput} onChangeText={(text) => setResort(text)} />
                        </View>

                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Flow:</Text>
                            <TextInput selectionColor='#EDF4F9' placeholder='Eg: Jib/Rail garden' style={styles.textInput} onChangeText={(text) => setFlow(text)} />
                        </View>


                        <View style={{ justifyContent: 'space-between' }}>

                            <View style={styles.pickerContainer}>
                                <Text style={styles.label}>Size: </Text>
                                <Picker
                                    selectedValue={size}
                                    style={styles.picker}
                                    itemStyle={{ height: 40 }}
                                    onValueChange={value =>
                                        setSize(value)
                                    }>
                                    <Picker.Item label="Small" value="s" />
                                    <Picker.Item label="Medium" value="m" />
                                    <Picker.Item label="Large" value="l" />
                                    <Picker.Item label="Massive" value="xl" />
                                </Picker>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.label}>Level:</Text>
                                <Picker
                                    selectedValue={level}
                                    style={styles.picker}
                                    itemStyle={{ height: 40 }}
                                    onValueChange={value =>
                                        setLevel(value)
                                    }>
                                    <Picker.Item label="Begginer" value="begginer" />
                                    <Picker.Item label="Intermediate" value="intermediate" />
                                    <Picker.Item label="Advanced" value="advanced" />
                                    <Picker.Item label="Only for rippers" value="ripper" />
                                </Picker>
                            </View>
                        </View>

                        <Button style={styles.buttonContainer} textStyle={styles.button} text='Set Location' onPress={() => setShowModal(true)} />

                    </View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        presentationStyle='formSheet'
                        visible={showModal}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.modalHeader}>
                            <Button onPress={() => setShowModal(false)} style={{ flex: 1 }} text='Cancel' textStyle={{ fontSize: 16, color: 'red' }} />
                            <Text style={styles.modalText}>Pick a location</Text>
                        </View>
                        <MapViewContainer _markers={location} style={styles.mapStyle} handleNewMarker={(coordinate) => {
                            console.log(location)
                            setLocation([coordinate])

                            setTimeout(() => {
                                setShowModal(false)
                            }, 100)
                        }} />
                    </Modal>

                    <View style={styles.bottomContainer}>

                        <Text style={styles.sectionHeader}>Number of features</Text>

                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Rails:</Text>
                            <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setRails(Number(text))} />
                        </View>

                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Boxes:</Text>
                            <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setBoxes(Number(text))} />
                        </View >

                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Kickers:</Text>
                            <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setKickers(Number(text))} />
                        </View >
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Pipes:</Text>
                            <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setPipes(Number(text))} />
                        </View >
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Other:</Text>
                            <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setOthers(Number(text))} />
                        </View >


                        {error && <Feedback level='warn' message={error} />}
                    </View>
                    <Button text='Next' style={styles.nextButton} textStyle={styles.button} onPress={handleNextStep} />
                </View>
            </ScrollView>

        </KeyboardAvoidingView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: 10,
        marginTop: 10,
        paddingBottom: '5%'
    },
    topContainer: {

        flex: 1
    },
    bottomContainer: {
        justifyContent: 'space-between',
        marginVertical: 25
    },

    sectionHeader: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },

    modalText: {
        color: '#82A4B3',
        fontSize: 16
    },
    modalHeader: {
        flex: 0.1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#EDF4F9',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        flex: 1,
    },

    textInput: {
        height: '160%',
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2

    },
    pickerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    picker: {
        height: 40,
        color: '#EFEBDA',
        width: '60%',
        backgroundColor: '#82A4B3',
        borderColor: '#EFEBDA',
        borderWidth: 2
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.855,
    },

    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        flex: 1
    },

    numberInput: {
        height: '150%',
        backgroundColor: '#82A4B3',
        width: '20%',
        alignSelf: 'flex-end',
        borderColor: '#EFEBDA',
        borderWidth: 2,
        paddingHorizontal: 10

    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        width: '90%',
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