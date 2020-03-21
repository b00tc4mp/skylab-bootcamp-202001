import React, { useState } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Picker, Keyboard, View, Text } from 'react-native'
import { Button, Feedback } from '../index'

export default function StepOne({ navigation }) {
    const [name, setName] = useState()
    const [resort, setResort] = useState()
    const [flow, setFlow] = useState()
    const [size, setSize] = useState('m')
    const [level, setLevel] = useState()
    const [rails, setRails] = useState()
    const [kickers, setKickers] = useState()
    const [boxes, setBoxes] = useState()
    const [others, setOthers] = useState()
    const [pipes, setPipes] = useState()
    const [error, setError] = useState(undefined)


    const handleNextStep = () => {
        switch (true) {
            case name === undefined || name.trim() === '':
                setError('Name is empty')
                break
            case resort === undefined || resort.trim() === '':
                setError('Resort is empty')
                break
            default:
                navigation.navigate('Featues info', { features: { rails, boxes, kickers, pipes, others }, park: { name, resort, flow, size, level } })
        }
    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: '60%' }} scrollEnabled={true}>
                    <KeyboardAvoidingView behavior='position' contentContainerStyle={{ flex: 1, justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={{ alignSelf: 'center' }}>Park Details</Text>
                        <View style={{ justifyContent: 'space-around', height: '25%' }}>
                            <Text>Size</Text>
                            <Picker
                                selectedValue={size}
                                style={{ height: 45, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
                                itemStyle={{ height: 45 }}
                                onValueChange={value =>
                                    setSize(value)
                                }>
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="Massive" value="xl" />
                            </Picker>
                            <Text>Level</Text>
                            <Picker
                                selectedValue={level}
                                style={{ height: 45, color: '#EFEBDA', backgroundColor: '#82A4B3' }}
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
                        <View style={{ justifyContent: 'space-around', marginVertical: 25 }}>
                            <View style={styles.textContainer}>
                                <Text>Name:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Oberjoch Park' style={styles.textInput} onChangeText={(text) => setName(text)} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text>Resort:</Text>
                                {error && <Feedback level='warn' message={error} />}
                                <TextInput onFocus={() => setError(null)} selectionColor='#EDF4F9' placeholder='Eg: Grindelwald' style={styles.textInput} onChangeText={(text) => setResort(text)} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text>Flow:</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='Eg: Jib/Rail garden' style={styles.textInput} onChangeText={(text) => setFlow(text)} />
                            </View>

                            <Text style={{ alignSelf: 'center', paddingTop: 15 }}>Number of features</Text>

                            <View style={styles.numbersContainer}>
                                <Text>Rails:</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setRails(Number(text))} />
                            </View>

                            <View style={styles.numbersContainer}>
                                <Text>Boxes:</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setBoxes(Number(text))} />
                            </View >

                            <View style={styles.numbersContainer}>
                                <Text>Kickers:</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setKickers(Number(text))} />
                            </View >
                            <View style={styles.numbersContainer}>
                                <Text>Pipes:</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setPipes(Number(text))} />
                            </View >
                            <View style={styles.numbersContainer}>
                                <Text>Other:</Text>
                                <TextInput selectionColor='#EDF4F9' placeholder='0' keyboardType='number-pad' maxLength={2} style={styles.numberInput} onChangeText={(text) => setOthers(Number(text))} />
                            </View >


                            <Button text='Next' style={styles.button} textStyle='text' onPress={handleNextStep} />
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: 10,
        marginTop: '1%'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        height: '8%',
        alignItems: 'center'
    },
    textInput: {
        height: '100%',
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        borderRadius: 5,
        paddingHorizontal: 10

    },

    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        height: '5%',
        alignItems: 'center'
    },

    numberInput: {
        height: '100%',
        backgroundColor: '#82A4B3',
        width: '20%',
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