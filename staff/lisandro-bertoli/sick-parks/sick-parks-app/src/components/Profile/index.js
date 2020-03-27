import React, { useState, useEffect } from 'react'
import { retrievePublishedParks } from 'sick-parks-logic'
import { ScrollView, Button, KeyboardAvoidingView, TextInput, View, Text, Modal } from 'react-native'
import MyButton from '../Button'
import Results from '../Results'

import styles from './styles'



export default function Profile({ navigation, route }) {
    const { handleLogout, user: _user } = route.params

    const [showModal, setShowModal] = useState(false)
    const [publishedParks, setPublishedParks] = useState()
    const [editProfile, setEditProfile] = useState()
    const [user, setUser] = useState()


    useEffect(() => {
        (async () => {

            const myParks = await retrievePublishedParks()
            _user.parks = myParks.length
            _user.name = _user.name.charAt(0).toUpperCase() + _user.name.slice(1)
            _user.surname = _user.surname.charAt(0).toUpperCase() + _user.surname.slice(1)
            setUser(_user)

        })()
    }, [_user.parks])




    const handleSettingsChange = async () => {
        //await updateUser()

    }


    const handleGoToMyParks = async () => {
        const myParks = await retrievePublishedParks()
        console.log(myParks)
        setPublishedParks(myParks)

        setShowModal(true)
    }


    const handleGoToSettings = () => {
        const { email, notifications, allowLocation } = user
        setEditProfile({ email, notifications, allowLocation })
        setShowModal(true)
    }

    const handleHideModal = () => {
        setShowModal(false)
        setPublishedParks()
        setEditProfile()
    }

    return (
        <>
            {user && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{`${user.name}'s Profile`}</Text>
                        <MyButton
                            onPress={handleLogout}
                            text='Logout'
                            style={styles.logoutButtonContainer}
                            textStyle={styles.logoutButton} />
                    </View>
                    <Modal
                        animationType="slide"
                        presentationStyle='formSheet'
                        transparent={false}
                        visible={showModal}>
                        <View style={styles.modalHeader}>
                            <MyButton onPress={handleHideModal} text='Cancel' textStyle={styles.modalButton} style={styles.modalButtonContainer} />
                            {publishedParks && <Text style={styles.headerText} >My Parks</Text>}
                            {editProfile && <Text style={styles.headerText} >Settings</Text>}
                        </View>
                        {publishedParks && <Results results={publishedParks} />}


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
                                    <Text style={styles.data}>{user.parks}</Text>
                                </View>
                                <View style={styles.topData}>
                                    <Text style={styles.dataType}>Contributions</Text>
                                    <Text style={styles.data}> {user.contributions.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userInfo}>
                            <Text>{`${user.name} ${user.surname}`}</Text>
                            <Text>{user.email}</Text>
                        </View>
                        <View style={styles.bottom}>


                            <MyButton
                                onPress={handleGoToSettings}
                                style={styles.actionButton}
                                text='Edit profile'
                                textStyle={styles.buttonText} />

                            <MyButton
                                onPress={handleGoToMyParks}
                                style={styles.actionButton}
                                text='My Parks'
                                textStyle={styles.buttonText} />


                        </View>



                    </ScrollView>
                </View>
            )
            }
            {
                !user && (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Hey stranger!</Text>

                        </View>
                        <View style={styles.top}>
                            <Text
                                style={{ textAlign: 'center' }}
                            >Hey there, if you want full access you will need to create an account</Text>
                        </View>
                        <View style={styles.bottom}>
                            <MyButton
                                onPress={() => navigation.navigate('Login')}
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

