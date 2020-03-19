import React, { useState } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Picker, TouchableWithoutFeedback, Keyboard, View, Text } from 'react-native'
import { Button, Feedback } from '../index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Login({ navigation, extraData }) {
    const [name, setName] = useState()
    const [resort, setResort] = useState()
    const [flow, setFlow] = useState()
    const [size, setSize] = useState('m')
    const [level, setLevel] = useState()
    const [rails, setRails] = useState()
    const [kickers, setKickers] = useState()
    const [boxes, setBoxes] = useState()
    const [transitions, setTransitions] = useState()
    const [pipes, setPipes] = useState()
    const [error, setError] = useState()

    const { getParkInfo } = extraData

    const handleNextStep = () => {
        switch (true) {
            case name === undefined || name.trim() === '':
                setError('Name is empty')
                break
            case resort === undefined || resort.trim() === '':
                setError('Name is empty')
                break
            default:
                getParkInfo({ name, resort, flow, size, level, rails, kickers, boxes, transitions, pipes })
            //  navigation.navigate('StepTwo')
        }
    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <KeyboardAvoidingView behavior='position' contentContainerStyle={styles.container}>

                        <View style={styles.inputsContainer}>
                            <Text>Name</Text>
                            <TextInput selectionColor='#EDF4F9' label='Name' style={styles.textInput} placeholder='Eg: Oberjoch Park' onChangeText={(text) => setName(text)} />
                            <Text>Resort</Text>
                            <TextInput selectionColor='#EDF4F9' label='Resort' style={styles.textInput} placeholder='Eg: Grindewald ' onChangeText={(text) => setResort(text)} />
                            <Text>Flow</Text>
                            <TextInput selectionColor='#EDF4F9' label='Flow' style={styles.textInput} placeholder='Eg: Jib / rail garden.' onChangeText={(text) => setFlow(text)} />
                            {error && <Feedback level='warn' message={error} />}
                        </View>

                        <View styles={styles.pickersContainer}>
                            <Text>Level</Text>
                            <Picker
                                selectedValue={size}
                                style={{ height: 45, flex: 0, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 45 }}
                                onValueChange={value =>
                                    setSize(value)
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Big Alright?" value="l" />
                                <Picker.Item label="Massive" value="xl" />
                            </Picker>
                            <Text>Size</Text>
                            <Picker
                                selectedValue={level}
                                style={{ height: 45, flex: 0, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 45 }}
                                onValueChange={value =>
                                    setLevel(value)
                                }>
                                <Picker.Item label="Begginer" value="begginer" />
                                <Picker.Item label="Intermediate" value="intermediate" />
                                <Picker.Item label="Advanced" value="advanced" />
                                <Picker.Item label="Only for rippers" value="ripper" />
                            </Picker>
                        </View>


                        <View style={styles.numbersContainer}>
                            <View>
                                <Text>Rails</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='2' keyboardType='number-pad' maxLength={2} label='Rails' style={styles.numberInput} onChangeText={(text) => setRails(text)} />
                            </View>

                            <View>
                                <Text>Boxes</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='2' keyboardType='number-pad' maxLength={2} label='Boxes' style={styles.numberInput} onChangeText={(text) => setBoxes(text)} />
                            </View>

                            <View>
                                <Text>Kickers</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='2' keyboardType='number-pad' maxLength={2} label='Kickers' style={styles.numberInput} onChangeText={(text) => setKickers(text)} />
                            </View>

                            <View>
                                <Text>Pipes</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='2' keyboardType='number-pad' maxLength={2} label='Other' style={styles.numberInput} onChangeText={(text) => setTransitions(text)} />
                            </View>

                            <View>
                                <Text>Other</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='2' keyboardType='number-pad' maxLength={2} label='Pipes' style={styles.numberInput} onChangeText={(text) => setPipes(text)} />
                            </View>

                        </View>


                        <View style={styles.button}>

                            <Button text='Next' type='main' textStyle='text' onPress={handleNextStep} />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        justifyContent: "space-around",
        alignItems: 'stretch',
        paddingHorizontal: 10,
        height: 700
    },
    inputsContainer: {

        flex: 0.65,
        justifyContent: 'space-between',

    },
    textInput: {
        backgroundColor: '#82A4B3',
        padding: 5,
        borderRadius: 5
    },
    pickersContainer: {
        justifyContent: 'space-around'
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    numberInput: {
        backgroundColor: '#82A4B3',
        width: 30,
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 10

    },
    button: {
        justifyContent: 'center'

    }

})