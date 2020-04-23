import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View, TextInput, Text } from 'react-native'
import Button from '../Button'
import Feedback from '../Feedback'
import styles from './styles'

export default UserSettings = ({ onUpdate, error }) => {
    const [userUpdates, setUserUpdates] = useState()

    const update = () => onUpdate(userUpdates)

    return (

        <KeyboardAvoidingView behavior='padding'>
            <ScrollView scrollEnabled={true}>
                <View style={styles.settingsContainer}>
                    <View style={styles.topSettings}>
                        <Text style={styles.sectionHeader}>Update my info</Text>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>New e-mail:  </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Your new email'
                                onChangeText={(email) => setUserUpdates({ ...userUpdates, email })}
                            />
                        </View>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>New name:  </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Your new email'
                                onChangeText={(name) => setUserUpdates({ ...userUpdates, name })}
                            />
                        </View>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>New surname:  </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Your new email'
                                onChangeText={(surname) => setUserUpdates({ ...userUpdates, surname })}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomSettings}>
                        <Text style={styles.sectionHeader}>Change Password</Text>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>New Password:  </Text>
                            <TextInput style={styles.textInput} placeholder='Your new password' onChangeText={(password) => setUserUpdates({ ...userUpdates, password })} />
                        </View>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.label}>Old Password:  </Text>

                            <TextInput
                                style={styles.textInput}
                                placeholder='Your old password'
                                onChangeText={(OldPassword) => setUserUpdates({ ...userUpdates, OldPassword })}
                            />
                        </View>

                        <Button style={styles.actionButton} text='Submit' textStyle={styles.buttonText} onPress={update} />
                    </View>
                    {error && <Feedback level='warn' message={error} />}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
} 