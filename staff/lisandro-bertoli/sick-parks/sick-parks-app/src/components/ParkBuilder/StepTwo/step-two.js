import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput, Picker, View, Text } from 'react-native'
import Button from '../../Button'
import Feature from '../../Feature'
import styles from './styles'


export default function StepOne({ onToStepThree, error }) {
    const [feature, setFeature] = useState()
    const [features, setFeatures] = useState([])

    const handleNextStep = () => onToStepThree(features)

    return (
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView scrollEnabled={true}>
                <View style={styles.container}>
                    <View style={{ justifyContent: "space-around" }}>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.featureProp} >Type: </Text>
                            <Picker
                                style={styles.picker}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => setFeature({ ...feature, name: value })}
                            >
                                <Picker.Item label="Rail" value="rail" />
                                <Picker.Item label="Kicker" value="kicker" />
                                <Picker.Item label="Box" value="box" />
                                <Picker.Item label="Pipe" value="pipe" />
                                <Picker.Item label="Other" value="other" />

                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.featureProp} >Size: </Text>
                            <Picker
                                style={styles.picker}
                                itemStyle={{ height: 40 }}
                                onValueChange={(value) => setFeature({ ...feature, size: value })}
                            >
                                <Picker.Item label="Small" value="s" />
                                <Picker.Item label="Medium" value="m" />
                                <Picker.Item label="Large" value="l" />
                                <Picker.Item label="XL" value="xl" />
                            </Picker>
                        </View>

                        <View style={styles.inputsContainer}>
                            <Text style={styles.featureProp}>Description:</Text>
                            <TextInput
                                selectionColor='#EDF4F9'
                                placeholder='Eg: Gnarly kinked rail'
                                style={styles.textInput}
                                onChangeText={(text) => setFeature({ ...feature, description: text })}
                            />
                        </View>
                    </View>
                    <Button text='Add feature' onPress={() => setFeatures([...features, feature])} />
                    {features.length > 0 ? (features.map((feature, index) => <Feature key={index} feature={feature} />)) : null}
                    <Button style={styles.nextButton} text='Next' textStyle={styles.button}
                        onPress={handleNextStep}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


