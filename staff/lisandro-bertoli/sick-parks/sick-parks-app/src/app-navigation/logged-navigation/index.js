import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeStack, BuilderStack, ProfileStack } from '../containers'

const Tabs = createBottomTabNavigator()


export default () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeStack} />
        {/* <Tabs.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} /> */}
        <Tabs.Screen name="Build" component={BuilderStack} />
        <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>

)


