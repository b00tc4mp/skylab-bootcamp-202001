import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from './stacks/Home'
import BuilderStack from './stacks/Builder'
import { ProfileContainer } from '../components/containers'

const Tabs = createBottomTabNavigator()

const homeImage = require('../../assets/icon-search.png')
const mapImage = require('../../assets/icon-location.png')
const buildImage = require('../../assets/icon-pick-and-shovel.png')
const profileImage = require('../../assets/icon-profile.png')


// const screenOptions = ({ route }) => ({
//     tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         switch (route.name) {
//             case 'Home':
//                 iconName
//                 break;

//             default:
//                 break;
//         }

//         if (route.name === 'Home') {
//             iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline';
//         } else if (route.name === 'Settings') {
//             iconName = focused ? 'ios-list-box' : 'ios-list';
//         }

//         // You can return any component that you like here!
//         return <Ionicons name={iconName} size={size} color={color} />;
//     },
// })

const tabOptions = {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
}

export default () => (
    <Tabs.Navigator tabBarOptions={tabOptions}>
        <Tabs.Screen name="Home" component={HomeStack} />
        {/* <Tabs.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} /> */}
        <Tabs.Screen name="Build" component={BuilderStack} />
        <Tabs.Screen name="Profile" component={ProfileContainer} />
    </Tabs.Navigator>
)



