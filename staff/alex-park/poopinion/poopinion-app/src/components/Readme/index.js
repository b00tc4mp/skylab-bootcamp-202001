import React, { useState } from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native'

function Readme({ goBack }) {
    const [page, setPage] = useState(1)

    function pageUp() {
        if (page === 3) return
        else setPage(page + 1)
    }

    function pageDown() {
        if (page === 1) return
        else setPage(page - 1)
    }

    return (<>
            <View style={styles.container}>
                <Image style={styles.imageHeader} source={require('../../../assets/header.png')} />

                <ScrollView style={styles.mainContainer}>
                    {page === 1 && (<>
                        <View>
                            <Text style={styles.textHeader}>Introduction</Text>
                            <Text style={styles.textContent}>{`Thank you for downloading Poopinion! As a new junior web-app developer in this world it humbles me that you decided to start using this small app.`}</Text>
                            <Text style={styles.textHeader}>What is Poopinion?</Text>
                            <Text style={styles.textContent}>{`Poopinion is a mobile-oriented app purposed on rating toilets on public spaces, such as restaurants, events or companies. It pursues to increase the standards of maintenance of those places and keep then clean, hygienic and pretty. Toilet necessities are evident and society needs better ways to know the quality of toilets they might be end up using.\n\nThe application is inspired by other rating apps such as TripAdvisor, where you can evaluate several features and give an overall score. The main difference is that Poopinator will allow registered users to post themselves, rather than check for company posts and rate them. This decision is done so the rating of toilets if full community-oriented.`}</Text>
                        </View>
                    </>)}

                    {page === 2 && (<>
                        <View>
                            <Text style={styles.textHeader}>How does it work?</Text>
                            <Text style={styles.textContent}>Take poops, upload the toilet, and rate it!</Text>
                        </View>
                    </>)}

                    {page === 3 && (<>
                        <View>
                            <Text style={styles.textHeader}>Additional Info:</Text>
                            <Text style={styles.textContent}>Please be nice to each other</Text>
                        </View>
                    </>)}
                </ScrollView>

                <View style={styles.navContainer}>
                    <View style={styles.pageNav}>
                        <TouchableOpacity style={styles.navButton} onPress={() => pageDown()}>
                            <Image style={styles.navButtonImage} source={require('../../../assets/previous.png')} />
                        </TouchableOpacity>

                        <Text style={styles.pageNumber}>{page} / 3</Text>

                        <TouchableOpacity style={styles.navButton} onPress={() => pageUp()}>
                            <Image style={styles.navButtonImage} source={require('../../../assets/next.png')} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                        <Text style={styles.button}>Go back</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </>)
}

export default Readme