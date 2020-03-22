import React, { useState, useEffect } from 'react'
import { retrieveUser, retrievePublishedParks } from 'sick-parks-logic'
import { ScrollView, Button, View, Text, Modal } from 'react-native'
import { Button as MyButton, Results } from '../index'
import styles from './styles'



export default function Profile({ navigation, route }) {
    const { handleLogout, user } = route.params

    const [showModal, setShowModal] = useState(false)
    const [publishedParks, setPublishedParks] = useState()
    //const [user, setuser] = useState()



    let { name, surname, email, image, allowLoCation, notifications, contributions, parks = 0 } = user
    name = name.charAt(0).toUpperCase() + name.slice(1)
    surname = surname.charAt(0).toUpperCase() + surname.slice(1)





    const handleMyParks = async () => {
        const myParks = await retrievePublishedParks()

        setPublishedParks(myParks)
        setShowModal(true)
    }

    const handleHideModal = () => {
        setShowModal(false)
        setPublishedParks()
    }


    return (
        <>
            {user && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{`${name} ${surname}`}</Text>
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
                            <MyButton onPress={handleHideModal} text='X' textStyle={{ fontSize: 20, color: '#EFEBDA' }} />

                        </View>
                        {publishedParks && <Results extraData={{ results: publishedParks }} />}


                        {/* {showSettings && <View style={{ backgroundColor: 'red' }}>
                            <Text>My Settings Modal</Text>
                        </View>} */}


                    </Modal>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={styles.top}>
                            <View style={styles.imageContainer}>
                                {image && <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain',
                                    }}
                                    source={{
                                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                                    }}
                                />}
                                {!image && <View style={styles.noImage}><Text style={{ alignSelf: 'center' }}>{name.charAt(0)}</Text></View>}
                            </View>
                            <View style={styles.topDataContainer}>
                                <View style={styles.topData}>
                                    <Text style={{ alignSelf: 'center' }}>Parks</Text>
                                    <Text style={{ alignSelf: 'center' }}>{parks}</Text>
                                </View>
                                <View style={styles.topData}>
                                    <Text style={{ alignSelf: 'center' }}>Contributions</Text>
                                    <Text style={{ alignSelf: 'center' }}> {contributions.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottom}>


                            <MyButton onPress={() => setShowSettings(true)} style={styles.actionButton} text='Edit profile' textStyle={styles.buttonText} />
                            <MyButton onPress={handleMyParks} style={styles.actionButton} text='My Parks' textStyle={styles.buttonText} />


                        </View>

                        <MyButton onPress={handleLogout} text='Logout' style={styles.logoutButton} textStyle={{ color: 'red', fontSize: 16 }} />

                    </ScrollView>
                </View>
            )}
            {!user && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Hey stranger!</Text>

                    </View>
                    <View style={styles.top}>
                        <Text style={{ textAlign: 'center' }}>Hey there, if you want full access you will need to create an account</Text>
                    </View>
                    <View style={styles.bottom}>
                        <MyButton onPress={() => navigation.navigate('Login')} style={styles.actionButton} text='Login' textStyle={styles.buttonText} />
                    </View>
                </View>
            )
            }
        </>
    )

}

