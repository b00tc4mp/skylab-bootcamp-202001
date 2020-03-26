import React, {useState, useEffect} from 'react'
import logic, { addProgressRecord, retrieveProgressRecord, updateProgress } from '../../logic';
import { View, Text, ScrollView, Image, Button, TouchableOpacity, AsyncStorage} from 'react-native'
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars'
import styles from './styles'
import moment from 'moment'

function Progress ({progress, user, token}) {
    //console.log(progress)
    //console.log(token)

    const [ markedDates, setMarketDates] = useState()

    async function calendar() {
        let check

        let date = AsyncStorage.getItem('date')

        date && (date = moment(date).format('YYYY-MM-DD'))

        !date && (await AsyncStorage.setItem('date', (date = moment().format('YYYY-MM-DD'))))

        console.log(date)
       
        let today = moment(new Date).format('YYYY-MM-DD')

        if (today > date) {
            await updateProgress(progress); //vaciar array 

            let index

            check = (progress.reduce((accum, value) => accum + value, 0))/progress.length
            if (check===1) {index = 'green'}
            else if (check <1 && check >= 0.75) {index= '#7CBA00'}
            else if (check < 0.75 && check > 0.5) {index = "#DBE900"}
            else if (check === 0.5) {index ='yellow'}
            else if (check < 0.5 && check >= 0.25) {index = "#FF8000"}
            else check = 'red'

            const recordDaily ={}

            recordDaily.date = date
            recordDaily.record = index

            await addProgressRecord(token, recordDaily)
        }

        const allProgress = await retrieveProgressRecord(token);

        console.log(allProgress)

        let _markedDates = {}
        allProgress.forEach(day => {
            _markedDates[day.date] = {disabled: true, startingDay: true, color: day.record, endingDay: true};
        })
   
        console.log(_markedDates)
        setMarketDates(_markedDates);
    }

    useEffect( ()=>{

        calendar();
        
    },[])

    return (<>
        
        <ScrollView >
            <View style={styles.container}>
                <View style ={styles.titleContainer}>
                    <View style={styles.titleLeft}>
                        <Text style={styles.titleText}>My Progress</Text>
                    </View>
                    <View style={styles.titleRight}>
                        <Image style={styles.logo} source={require('../../../assets/images/calendar.png')}/>
                    </View>
                </View>
                    <Calendar
                        // style={{
                        //     flex: 1,
                        //     borderWidth: 1,
                        //     borderColor: 'gray',
                        //     height: 350
                        // }}
                        // Specify theme properties to override specific styles for calendar parts. Default = {}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: 'orange',
                            disabledArrowColor: '#d9e1e8',
                            //monthTextColor: 'blue',
                            indicatorColor: 'blue',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 15,
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 15
                        }}
                        onDayPress={(day) => {console.log('selected day', day)}}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MM yyyy'}
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
                        
                        markedDates ={markedDates}

                        markingType={'period'}
         
                    />
            </View>
        </ScrollView>
        
        
    </>)
}

export default Progress