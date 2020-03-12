import React from 'react'
import { View, Text } from 'react-native'

function Test (props) {

    return (
        <View style={{marginTop: 50}}>
            <Text >{props.data.name}</Text>

        </View>
    )
}

export default Test