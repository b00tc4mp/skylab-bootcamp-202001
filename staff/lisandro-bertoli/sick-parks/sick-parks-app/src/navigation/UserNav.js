import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from '../stacks/Home'
import BuilderStack from '../stacks/Builder'

const Tabs = createBottomTabNavigator()

const homeImage = require('./assets/icon-search.png')
const mapImage = require('./assets/icon-location.png')
const buildImage = require('./assets/icon-pick-and-shovel.png')
const profileImage = require('./assets/icon-profile.png')


export default () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeStack} />
        {/* <Tabs.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} /> */}
        <Tabs.Screen name="Build" component={BuilderStack} />
        <Tabs.Screen name="Profile" component={ProfileContainer} />
    </Tabs.Navigator>
)


