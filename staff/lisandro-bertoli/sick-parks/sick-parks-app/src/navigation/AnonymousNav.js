import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, Image } from 'react-native'

import HomeStack from './stacks/Home'
import { NotAllowedContainer } from '../components'
import { colors } from '../constants'

const Tabs = createBottomTabNavigator()

const homeImage = require('../../assets/icon-search.png')
const mapImage = require('../../assets/icon-location.png')
const buildImage = require('../../assets/icon-pick-and-shovel.png')
const profileImage = require('../../assets/icon-profile.png')


const options = ({ route }) => ({
    tabBarIcon: () => {
        let iconName
        if (route.name === 'Home') iconName = homeImage
        else if (route.name === 'Map') iconName = mapImage
        else if (route.name === 'Build') iconName = buildImage
        else if (route.name === 'Profile') iconName = profileImage

        return <Image source={iconName} style={styles.icon} />
    },
})

const tabOptions = {
    activeTintcolor: colors.SECONDARY,
    inactiveTintColor: 'lightgrey',
    style: {
        backgroundColor: colors.MAIN
    }
}


export default () => (

    <Tabs.Navigator tabBarOptions={tabOptions} screenOptions={options}>
        <Tabs.Screen name="Home" component={HomeStack} />
        {/* <Tabs.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} /> */}
        <Tabs.Screen name="Build" component={NotAllowedContainer} />
        <Tabs.Screen name="Profile" component={NotAllowedContainer} />
    </Tabs.Navigator>
)


const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        tintColor: colors.SECONDARY
    }
})