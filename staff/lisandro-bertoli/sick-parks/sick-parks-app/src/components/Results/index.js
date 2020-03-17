import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image, FlatList } from 'react-native'
import ResultsItem from '../ResultsItem'


export default function Results({ results, onToParkDetail }) {

    // console.log(results)
    return (<>
        <Text>Text</Text>
        <View style={styles.container}>
            <FlatList

                data={results}
                renderItem={({ item }) => {
                    // console.log(item)
                    return <ResultsItem park={item} onToPark={onToParkDetail} />
                }}
                keyExtractor={item => item.id}
            />
        </View>
    </>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
