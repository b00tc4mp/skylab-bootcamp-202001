import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './styles'
import { colors } from '../../constants'

export default Loading = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={`${colors.MAIN}`} />
    </View>
)
