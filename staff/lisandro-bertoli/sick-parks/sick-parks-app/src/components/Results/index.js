import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import ResultsItem from '../ResultsItem'


export default function Results({ results, onToParkDetail }) {


    return (<>
        <View style={styles.container}>
            <FlatList

                data={results}
                renderItem={({ item }) => {

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
