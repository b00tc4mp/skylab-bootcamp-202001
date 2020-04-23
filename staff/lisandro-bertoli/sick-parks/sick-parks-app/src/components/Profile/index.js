import React, { useState } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import MyButton from '../Button'
import UserSettings from '../UserSettings'
import Results from '../Results'
import MyModal from '../MyModal'
import styles from './styles'
const logoutImg = require('../../../assets/sign-out.png')


export default function Profile({ onLogout, user, userParks, onUpdateUser, error }) {
    const [modal, setModal] = useState({ show: false })

    const onToModal = (title) => setModal({ show: true, title })

    const userUpdate = (updates) => onUpdateUser(updates)

    const handleModalToggle = () => setModal({ show: false })

    return (

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
            <MyModal visibility={modal.show} modalToggle={handleModalToggle} title={modal.title}>
                {modal.title === 'Parks' && <Results onToDetails={() => { }} results={userParks} />}
                {modal.title === 'Settings' && <UserSettings onUpdate={userUpdate} error={error} />}
            </MyModal>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.top}>
                    <View style={styles.imageContainer}>
                        <View style={styles.noImage}>
                            <Text style={styles.buttonText}>{user.name.charAt(0)}</Text>
                        </View>
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
                    <Text style={styles.text}>{`${user.name} ${user.surname}`}</Text>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.bottom}>
                    <MyButton
                        onPress={() => onToModal('Settings')}
                        style={styles.actionButton}
                        text='Edit profile'
                        textStyle={styles.buttonText} />

                    <MyButton
                        onPress={() => onToModal('Parks')}
                        style={styles.actionButton}
                        text='My Parks'
                        textStyle={styles.buttonText} />
                </View>
            </ScrollView>
        </View >
    )
}

