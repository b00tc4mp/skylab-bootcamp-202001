import React from 'react'
import { View, TouchableOpacity } from 'react-native'


export default function RadioButton(props) {
    return (
        <TouchableOpacity >
            <View style={[{
                height: 16,
                width: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 8,
                            width: 8,
                            borderRadius: 4,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
        </TouchableOpacity>
    );
}