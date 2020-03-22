import React from 'react'
import styles from './styles'
import { Text, ScrollView, View, TouchableOpacity, Image, Alert } from 'react-native'

function Favorites({ user, favToilets, onFav, onDetails }) {
    return (<>
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{user.name} {user.surname}'s Favorite Toilets 🚽</Text>
            </View>

            <View style={styles.favsContainer}>
                {
                    favToilets.length > 0 &&

                    <View style={styles.resultsContainer}>
                        {favToilets.map((toilet, index) => (<>
                            <View style={styles.toiletContainer} key={index}>
                                <TouchableOpacity key={index} onPress={() => onDetails(toilet.id.toString())}>
                                    {toilet.image ? (<Image style={styles.image} source={{ uri: toilet.image }} />)
                                        :
                                        (<Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />)}
                                </TouchableOpacity>
                                <View style={styles.infoContainer}>
                                    <TouchableOpacity style={styles.result}>
                                        <Text style={styles.postHeader}>{toilet.place}</Text>
                                        <Text style={styles.postedAt}>Posted at: {toilet.created.toString().slice(0, 10)}, by {toilet.publisher.name} {toilet.publisher.surname}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.favContainer} onPress={() => { onFav(toilet.id) }}>
                                        {toilet.isFavedBy.includes(user.id) &&
                                            (<Image style={styles.favButton} source={require('../../../assets/faved.png')} />)
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>))}
                    </View>
                }

                {!favToilets.length && <Text>No favorite toilets to display...</Text>}
            </View>
        </ScrollView>
    </>)
}

export default Favorites