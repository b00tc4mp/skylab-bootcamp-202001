import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import ResultsItem from '../ResultsItem'


export default function Results({ navigation, extraData }) {

    const { results } = extraData
    console.log(results)
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
