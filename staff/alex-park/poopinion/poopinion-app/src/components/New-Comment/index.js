import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Picker, Slider, KeyboardAvoidingView } from 'react-native'
import styles from './styles'

function NewComment({ toilet, onSubmit }) {
    const [cleanness, setCleanness] = useState(0)
    const [looks, setLooks] = useState(0)
    const [payment, setPayment] = useState(0)
    const [multiple, setMultiple] = useState(0)
    const [paper, setPaper] = useState(0)
    const [score, setScore] = useState(0)
    const [text, setText] = useState()

    return (<>
        <ScrollView>
            <Image style={styles.image} source={{ uri: toilet.image }} />
            <View style={styles.container}>
                <Text style={styles.header}>New rating/comment for: <Text style={styles.italic}>{toilet.place}</Text> </Text>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Level of cleanness?: <Text style={styles.value}>{cleanness}</Text></Text>
                    <View style={styles.sliderContainer}>
                        <Text>0</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            onValueChange={(value) => setCleanness(parseInt(value))}
                        />
                        <Text>5</Text>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>How beautiful does it look?: <Text style={styles.value}>{looks}</Text></Text>
                    <View style={styles.sliderContainer}>
                        <Text>0</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            onValueChange={(value) => setLooks(parseInt(value))}
                        />
                        <Text>5</Text>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Need to pay to use the toilet?:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={payment}
                            onValueChange={(itemValue) =>
                                setPayment(itemValue)
                            }>
                            <Picker.Item style={styles.form} label="Yes" value={1} />
                            <Picker.Item style={styles.form} label="No" value={0} />
                        </Picker>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Does it have multiple toilets?:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={multiple}
                            onValueChange={(itemValue) =>
                                setMultiple(itemValue)
                            }>
                            <Picker.Item style={styles.form} label="Yes" value={1} />
                            <Picker.Item style={styles.form} label="No" value={0} />
                        </Picker>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Is the toilet paper provision good?:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={paper}
                            onValueChange={(itemValue) =>
                                setPaper(itemValue)
                            }>
                            <Picker.Item style={styles.form} label="Yes" value={1} />
                            <Picker.Item style={styles.form} label="No" value={0} />
                        </Picker>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={[styles.question, styles.value]}>OVERALL RATING: <Text style={styles.value}>{score}</Text></Text>
                    <View style={styles.sliderContainer}>
                        <Text>0</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            onValueChange={(value) => setScore(parseInt(value))}
                        />
                        <Text>5</Text>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <KeyboardAvoidingView behavior='position'>
                        <Text style={styles.question}>(Optional) Add a comment here:</Text>
                        <View style={styles.sliderContainer}>
                            <TextInput style={styles.input} placeholder='Start writing here' onChangeText={(text) => setText(text)} />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>

            <TouchableOpacity onPress={() => onSubmit({ cleanness, looks, payment, multiple, paper, score, text })} >
                <Text style={styles.submit} >💩 SUBMIT 💩</Text>
            </TouchableOpacity>
        </ScrollView>
    </>)
}

export default NewComment