import React from 'react'

import { StyleSheet, ScrollView, Button, View, Text } from 'react-native'

export default function Profile({ navigation, route }) {
    const { handleLogout } = route.params

    return (
        <ScrollView>
            <Text>Profile Page</Text>
            <Button onPress={handleLogout} title='Logout' />
        </ScrollView>
    )
}