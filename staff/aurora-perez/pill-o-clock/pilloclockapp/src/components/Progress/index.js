import React, {useState} from 'react'
import { View, Text, ScrollView, Image, Button, TouchableOpacity} from 'react-native'
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars'
import styles from './styles'

function Progress () {

    return (<>
        
        <ScrollView >
            <View style={styles.container}>
                <View style ={styles.titleContainer}>
                    <View style={styles.titleLeft}>
                        <Text style={styles.titleText}>My Progress</Text>
                    </View>
                    <View style={styles.titleRight}>
                        <Image style={styles.logo} source={require('../../../assets/images/calendar.jpg')}/>
                    </View>
                </View>
                    <Calendar
                        
                        
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {console.log('selected day', day)}}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        
                        
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={true}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        markedDates={{
                            
                            '2020-03-22': {startingDay: true, color: 'green'},
                            '2020-03-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                            '2020-04-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                        }}
                        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                        markingType={'period'}
                    />
            </View>
        </ScrollView>
        
        
    </>)
}

export default Progress