import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Picker, Slider, KeyboardAvoidingView } from 'react-native'
import styles from './styles'

function NewComment({ toilet, onSubmit, user, onUpdate }) {
    const [cleanness, setCleanness] = useState(0)
    const [looks, setLooks] = useState(0)
    const [paymentRequired, setPaymentRequired] = useState(0)
    const [multipleToilets, setMultipleToilets] = useState(0)
    const [paperDeployment, setPaperDeployment] = useState(0)
    const [overallRating, setOverallRating] = useState(0)
    const [textArea, setTextArea] = useState('')

    return (<>
        <ScrollView>
            {toilet.image ? (<Image style={styles.image} source={{ uri: toilet.image }} />)
                :
                (<Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />)}
            <View style={styles.container}>
                <Text style={styles.header}>New rating/comment for: <Text style={styles.italic}>{toilet.place}</Text></Text>

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
                            selectedValue={paymentRequired}
                            onValueChange={(itemValue) =>
                                setPaymentRequired(itemValue)
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
                            selectedValue={multipleToilets}
                            onValueChange={(itemValue) =>
                                setMultipleToilets(itemValue)
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
                            selectedValue={paperDeployment}
                            onValueChange={(itemValue) =>
                                setPaperDeployment(itemValue)
                            }>
                            <Picker.Item style={styles.form} label="Yes" value={1} />
                            <Picker.Item style={styles.form} label="No" value={0} />
                        </Picker>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={[styles.question, styles.value]}>OVERALL RATING: <Text style={styles.value}>{overallRating}</Text></Text>
                    <View style={styles.sliderContainer}>
                        <Text>0</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            onValueChange={(value) => setOverallRating(parseInt(value))}
                        />
                        <Text>5</Text>
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <KeyboardAvoidingView behavior='position'>
                        <Text style={styles.question}>(Optional) Add a comment here:</Text>
                        <View style={styles.sliderContainer}>
                            <TextInput style={styles.input} placeholder='Start writing here' onChangeText={(text) => setTextArea(text)} />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>

            <View>
                {user.comments.length && typeof user.comments.find(comment => comment.commentedAt.toString() === toilet.id.toString()) !== 'undefined' ? (<>
                    <TouchableOpacity onPress={() => onUpdate({
                        rating: {
                            cleanness,
                            looks,
                            paymentRequired,
                            multipleToilets,
                            paperDeployment,
                            overallRating,
                            textArea
                        }
                    }, { commentId: user.comments.find(comment => comment.commentedAt.toString() === toilet.id.toString()).id.toString() })}>
                        <Text style={styles.submit}>💩 SUBMIT 💩</Text>
                    </TouchableOpacity>
                </>)
                    :
                    (<>
                        <TouchableOpacity onPress={() => onSubmit({
                            rating: {
                                cleanness,
                                looks,
                                paymentRequired,
                                multipleToilets,
                                paperDeployment,
                                overallRating,
                                textArea
                            }
                        })}>
                            <Text style={styles.submit}>💩 SUBMIT 💩</Text>
                        </TouchableOpacity>
                    </>)}
            </View>
        </ScrollView>
    </>)
}

export default NewComment