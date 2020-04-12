import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './styles'
import { COLORS } from '../../constants'

export default Loading = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={`${COLORS.main}`} />
    </View>
)
