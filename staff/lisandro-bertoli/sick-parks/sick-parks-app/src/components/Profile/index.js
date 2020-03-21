import React, { useState } from 'react'

import { StyleSheet, ScrollView, Button, View, Text, Modal } from 'react-native'
import { Button as MyButton } from '../index'



export default function Profile({ navigation, route }) {
    const [showSettings, setShowSettings] = useState(false)
    const [showParks, setShowParks] = useState(false)



    const { handleLogout, user } = route.params
    let { name, surname, email, image, allowLoCation, notifications, contributions, parks = 0 } = user
    name = name.charAt(0).toUpperCase() + name.slice(1)
    surname = surname.charAt(0).toUpperCase() + surname.slice(1)

    function MyParks() {
        <View style={{ backgroundColor: 'red' }}>
            <Text>My Modal</Text>
        </View>
    }



    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                presentationStyle='formSheet'
                transparent={false}
                onDismiss={() => { setShowParks(false); setShowSettings(false) }}
                visible={showParks || showSettings}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>

                {showParks && <View style={{ backgroundColor: 'red' }}>
                    <Text>My Parks Modal</Text>
                </View>}
                {showSettings && <View style={{ backgroundColor: 'red' }}>
                    <Text>My Settings Modal</Text>
                </View>}

            </Modal>
            <View style={styles.header}>
                <Text style={styles.headerText}>{`${name} ${surname}`}</Text>
            </View>
            <ScrollView >
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


                    <MyButton onPress={() => setShowSettings(true)} style={styles.editButton} text='Edit profile' textStyle='text' />
                    <MyButton onPress={() => setShowParks(true)} style={styles.myParksButton} text='My Parks' textStyle='text' />
                    <Button onPress={handleLogout} title='Logout' />


                    {!user && <Button onPress={handleOnToLogin} title='Login' />}





                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EDF4F9',
    },
    header: {
        flex: 0.20,
        backgroundColor: '#82A4B3',
        justifyContent: 'center'
    },
    headerText: {
        paddingTop: 10,
        alignSelf: 'center'
    },
    noImage: {
        width: 100,
        height: 100,
        backgroundColor: '#EFEBDA',

        justifyContent: 'center',
        borderRadius: 10,
    },
    imageContainer: {

    },
    topDataContainer: {
        flex: 1,
        height: '60%',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignContent: 'center'
    },
    topData: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-evenly'
    },
    top: {
        height: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15

    },
    bottom: {
        flex: 1,
        height: 200,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        justifyContent: 'space-around'
    },
    editButton: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#82A4B3",
        height: 40,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    }

})