import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import ResultsItem from '../ResultsItem'
import styles from './styles'

export default function Results({ navigation, extraData }) {
    const { results } = extraData

    return (<>
        <View style={styles.container}>
            <FlatList
                data={results}
                renderItem={({ item }) => {

                    return <ResultsItem park={item} onToPark={() => navigation.navigate('ParkDetails')} />
                }}
                keyExtractor={item => item.id}
            />
        </View>
    </>
    )
}
