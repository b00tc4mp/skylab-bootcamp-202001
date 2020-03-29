import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput, View, Text, Modal, Image } from 'react-native'
import MyButton from '../Button'
import Results from '../Results'

import styles from './styles'
const logoutImg = require('../../../assets/sign-out.png')


export default function Profile({ onLogout, user, onToLogin, userParks }) {
    const [showModal, setShowModal] = useState(false)
    const [editProfile, setEditProfile] = useState()


    const handleGoToSettings = () => {
        setEditProfile(true)
        setShowModal(true)
    }

    const handleHideModal = () => {
        setShowModal(false)
        setEditProfile()
    }

    return (
        <>
            {user !== 'guest' && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{`${user.name}'s Profile`}</Text>

                        <MyButton
                            onPress={onLogout}
                            style={styles.logoutButtonContainer}
                            textStyle={styles.logoutButton} >
                            <Image source={logoutImg} style={styles.logoutImage} />
                        </MyButton>
                    </View>
                    <Modal
                        animationType="slide"
                        presentationStyle='formSheet'
                        transparent={false}
                        visible={showModal}>
                        <View style={styles.modalHeader}>
                            <MyButton onPress={handleHideModal} text='Cancel' textStyle={styles.modalButton} style={styles.modalButtonContainer} />
                            {!editProfile && <Text style={styles.modalHeaderText} >My Parks</Text>}
                            {editProfile && <Text style={styles.modalHeaderText} >Settings</Text>}
                        </View>
                        {!editProfile && <Results onToDetails={() => { }} results={userParks} />}


                        {editProfile &&
                            <KeyboardAvoidingView behavior='padding'>
                                <ScrollView scrollEnabled={true}>
                                    <View style={styles.settingsContainer}>
                                        <View style={styles.topSettings}>
                                            <Text style={styles.sectionHeader}>Update e-mail</Text>
                                            <View style={styles.inputsContainer}>
                                                <Text style={styles.label}>New e-mail:  </Text>
                                                <TextInput style={styles.textInput} placeholder='Your email password' />
                                            </View>

                                            <MyButton style={styles.actionButton} text='Change' textStyle={styles.buttonText} />
                                        </View>
                                        <View style={styles.bottomSettings}>
                                            <Text style={styles.sectionHeader}>Change Password</Text>
                                            <View style={styles.inputsContainer}>
                                                <Text style={styles.label}>New Password:  </Text>
                                                <TextInput style={styles.textInput} placeholder='Your new password' />
                                            </View>
                                            <View style={styles.inputsContainer}>
                                                <Text style={styles.label}>Old Password:  </Text>

                                                <TextInput style={styles.textInput} placeholder='Your old password' />

                                            </View>
                                            <MyButton style={styles.actionButton} text='Change' textStyle={styles.buttonText} />
                                        </View>
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>}
                    </Modal>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={styles.top}>
                            <View style={styles.imageContainer}>
                                {user.image && <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain',
                                    }}
                                    source={{
                                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                                    }}
                                />}
                                {!user.image &&
                                    <View
                                        style={styles.noImage}>
                                        <Text style={styles.buttonText}>{user.name.charAt(0)}</Text>
                                    </View>}
                            </View>
                            <View style={styles.topDataContainer}>
                                <View style={styles.topData}>
                                    <Text style={styles.dataType}>Parks</Text>
                                    <Text style={styles.data}>{userParks.length}</Text>
                                </View>
                                <View style={styles.topData}>
                                    <Text style={styles.dataType}>Contributions</Text>
                                    <Text style={styles.data}> {user.contributions.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.data}>{`${user.name} ${user.surname}`}</Text>
                            <Text style={styles.data}>{user.email}</Text>
                        </View>
                        <View style={styles.bottom}>


                            <MyButton
                                onPress={handleGoToSettings}
                                style={styles.actionButton}
                                text='Edit profile'
                                textStyle={styles.buttonText} />

                            <MyButton
                                onPress={() => setShowModal(true)}
                                style={styles.actionButton}
                                text='My Parks'
                                textStyle={styles.buttonText} />


                        </View>



                    </ScrollView>
                </View>
            )
            }
            {
                user === 'guest' && (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Hey stranger!</Text>

                        </View>
                        <View style={styles.top}>
                            <Text
                                style={styles.text}
                            >Hey there, if you want full access you will need to create an account</Text>
                        </View>
                        <View style={styles.bottom}>
                            <MyButton
                                onPress={onToLogin}
                                style={styles.actionButton}
                                text='Login'
                                textStyle={styles.buttonText} />
                        </View>
                    </View>
                )
            }
        </>
    )

}

