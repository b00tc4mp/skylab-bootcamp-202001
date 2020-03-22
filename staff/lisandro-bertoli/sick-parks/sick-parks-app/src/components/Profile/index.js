import React, { useState, useEffect } from 'react'
import { retrieveUser, retrievePublishedParks } from 'sick-parks-logic'
import { ScrollView, Button, KeyboardAvoidingView, TextInput, View, Text, Modal } from 'react-native'
import { Button as MyButton, Results } from '../index'
import styles from './styles'



export default function Profile({ navigation, route }) {
    const { handleLogout } = route.params

    const [showModal, setShowModal] = useState(false)
    const [publishedParks, setPublishedParks] = useState()
    const [editProfile, setEditProfile] = useState()
    const [user, setuser] = useState()


    useEffect(() => {
        (async () => {
            const _user = await retrieveUser()
            const myParks = await retrievePublishedParks()
            _user.parks = myParks.length
            _user.name = _user.name.charAt(0).toUpperCase() + _user.name.slice(1)
            _user.surname = _user.surname.charAt(0).toUpperCase() + _user.surname.slice(1)
            setuser(_user)

        })()
    }, [])



    const handleSettingsChange = async () => {
        //await updateUser()

    }


    const handleGoToMyParks = async () => {
        const myParks = await retrievePublishedParks()

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
                        <Text style={styles.headerText}>{`${user.name} ${user.surname}`}</Text>
                    </View>
                    <Modal
                        animationType="slide"
                        presentationStyle='formSheet'
                        transparent={false}
                        onDismiss={handleHideModal}
                        visible={showModal}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.modalHeader}>
                            <MyButton onPress={handleHideModal} style={{ paddingHorizontal: 30, marginRight: '23%' }} text='X' textStyle={{ fontSize: 20, color: '#EFEBDA' }} />
                            {publishedParks && <Text>My Parks</Text>}
                            {editProfile && <Text>Settings</Text>}
                        </View>
                        {publishedParks && <Results extraData={{ results: publishedParks }} />}


                        {editProfile &&
                            <KeyboardAvoidingView style={{ flex: 1 }}>
                                <View style={{ flex: 1, backgroundColor: '#EDF4F9', justifyContent: 'space-around' }}>
                                    <View style={{ flex: 0.3, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ alignSelf: 'center' }}>Update e-mail</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>
                                            <Text style={{ flex: 0.7 }}>New e-mail:  </Text>
                                            <TextInput style={styles.input} placeholder='Your email password' />

                                        </View>

                                        <MyButton style={styles.actionButton} text='Change' textStyle={styles.buttonText} />
                                    </View>
                                    <View style={{ flex: 0.4, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ alignSelf: 'center' }}>Change Password</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>
                                            <Text style={{ flex: 0.7 }}>New Password:  </Text>
                                            <TextInput style={styles.input} placeholder='Your new password' />

                                        </View>
                                        <View style={{ flex: 1, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>
                                            <Text style={{ flex: 0.7 }}>Old Password:  </Text>

                                            <TextInput style={styles.input} placeholder='Your old password' />

                                        </View>
                                        <MyButton style={styles.actionButton} text='Change' textStyle={styles.buttonText} />
                                    </View>
                                </View>
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
                                    <Text style={{ alignSelf: 'center' }}>Parks</Text>
                                    <Text style={{ alignSelf: 'center' }}>{user.parks}</Text>
                                </View>
                                <View style={styles.topData}>
                                    <Text style={{ alignSelf: 'center' }}>Contributions</Text>
                                    <Text style={{ alignSelf: 'center' }}> {user.contributions.length}</Text>
                                </View>
                            </View>
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

                        <MyButton
                            onPress={handleLogout}
                            text='Logout'
                            style={styles.logoutButton}
                            textStyle={{ color: 'red', fontSize: 16 }} />

                    </ScrollView>
                </View>
            )}
            {!user && (
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

